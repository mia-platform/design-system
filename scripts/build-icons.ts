/**
 * Copyright 2024 Mia srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable no-console */

import { Cheerio, load } from 'cheerio'
import { type TarOptionsWithAliasesAsyncNoFile, extract } from 'tar'
import { Element } from 'domhandler'
import { IconTree } from 'react-icons'
import camelcase from 'camelcase'
import fs from 'fs/promises'
import { glob } from 'glob'
import https from 'https'
import path from 'path'
import url from 'url'

const REACT_ICONS_VERSION = '5.3.0'
const REACT_ICONS_PACKAGES = ['lib', 'ai', 'fi', 'pi']

const dirname = path.dirname(url.fileURLToPath(import.meta.url))
const rootDir = path.resolve(dirname, '..')
const outDir = path.resolve(rootDir, 'icons')

async function setup(): Promise<void> {
  const outDirContent = await fs.readdir(outDir)

  const promises = outDirContent.reduce<Promise<void>[]>((acc, cur) => {
    if (cur !== 'package.json') {
      const pathToRemove = path.resolve(outDir, cur)
      return [...acc, fs.rm(pathToRemove, { recursive: true, force: true })]
    }

    return acc
  }, [])

  await Promise.all(promises)
}

async function downloadReactIconsPackage(): Promise<void> {
  const pkgUrl = `https://github.com/react-icons/react-icons/releases/download/v${REACT_ICONS_VERSION}/react-icons-all-files-${REACT_ICONS_VERSION}.tgz`

  const tarOptions: TarOptionsWithAliasesAsyncNoFile = {
    cwd: outDir,
    filter: (entryPath) => REACT_ICONS_PACKAGES.some((pkgName) => entryPath.startsWith(`package/${pkgName}`)),
    strip: 1,
  }

  const urlToCall = await new Promise<string>((resolve, reject) => {
    const reqUrl = new url.URL(pkgUrl)

    const request = https.get(reqUrl, (res) => resolve(res.headers.location ?? ''))

    request.on('error', reject)
  })

  await new Promise<void>((resolve, reject) => {
    const request = https.get(urlToCall)

    request.on('response', (res) => {
      res.pipe(extract(tarOptions), { end: true })

      res.on('error', reject)

      res.on('end', resolve)
    })

    request.on('error', reject)
  })
}

async function svgStringToTree(svg: string): Promise<IconTree> {
  const $doc = load(svg, { xmlMode: true })
  const $svg = $doc('svg')

  const normalizeAttributes = (attributes: Record<string, string> = {}, tagName: string): Record<string, string> => {
    const attributesToFilerOut = [
      'class',
      ...(tagName === 'svg' ? ['xmlns', 'xmlns:xlink', 'xml:space', 'width', 'height'] : []),
    ]

    return Object
      .keys(attributes)
      .filter((name) => !attributesToFilerOut.includes(name))
      .reduce<Record<string, string>>((nextAttributes, attributeName) => {
        const newName = attributeName.startsWith('aria-') ? attributeName : camelcase(attributeName)
        nextAttributes[newName] = attributes[attributeName]
        return nextAttributes
      }, {})
  }

  function elementToTree(element: Cheerio<Element>): IconTree[] {
    return (
      element
        .filter((_, { tagName }) => Boolean(tagName && !['style', 'title'].includes(tagName)))
        .map((_, { tagName, attribs, children }) => ({
          tag: tagName,
          attr: normalizeAttributes(attribs, tagName),
          child: children?.length ? elementToTree($doc(children) as unknown as Cheerio<Element>) : [],
        }))
        .get()
    )
  }

  const tree = elementToTree($svg)
  return tree[0]
}

async function buildMiaIcons(): Promise<void> {
  const miaIconsPackageDir = path.resolve(outDir, 'mi')
  await fs.mkdir(miaIconsPackageDir)

  const svgFiles = await glob(path.resolve(rootDir, 'src/assets/icons/*.svg'))

  const promises = svgFiles.map(async(filePath) => {
    const iconNameRaw = path.basename(filePath, path.extname(filePath))
    const iconName = `Mi${camelcase(iconNameRaw, { pascalCase: true })}`

    const svgStr = await fs.readFile(filePath, 'utf-8')

    const iconTree = await svgStringToTree(svgStr)
    const iconTreeStr = JSON.stringify(iconTree)

    const esmFilePath = path.resolve(miaIconsPackageDir, `${iconName}.mjs`)
    const esmTemplate = `// THIS FILE IS AUTO GENERATED\n`
    + `import { GenIcon } from '../lib/index.mjs';\n`
    + `export function ${iconName} (props) {\n`
    + `  return GenIcon(${iconTreeStr})(props);\n`
    + `};\n`

    const cjsFilePath = path.resolve(miaIconsPackageDir, `${iconName}.js`)
    const cjsTemplate = `// THIS FILE IS AUTO GENERATED\n`
    + `var GenIcon = require('../lib').GenIcon\n`
    + `module.exports.${iconName} = function ${iconName} (props) {\n`
    + `  return GenIcon(${iconTreeStr})(props);\n`
    + `};\n`

    const declarationsFilePath = path.resolve(miaIconsPackageDir, `${iconName}.d.ts`)
    const declarationsTemplate = `// THIS FILE IS AUTO GENERATED\n`
    + `import { IconType } from '../lib/index.mjs'\n`
    + `export declare const ${iconName}: IconType;\n`

    await fs.writeFile(esmFilePath, esmTemplate, 'utf-8')
    await fs.writeFile(cjsFilePath, cjsTemplate, 'utf-8')
    await fs.writeFile(declarationsFilePath, declarationsTemplate, 'utf-8')
  })

  await Promise.all(promises)
}

async function buildIconDictionary(): Promise<void> {
  const files = await glob(path.resolve(outDir, '*/*.mjs'))

  const parsePath = (fullPath: string): {name: string, pkg: string} => {
    const tokens = fullPath.split('/')
    const file = tokens[tokens.length - 1]
    const pkg = tokens[tokens.length - 2]
    return { name: file.replace('.mjs', ''), pkg }
  }

  const dictionary = files.reduce((acc, filePath) => {
    const { name, pkg } = parsePath(filePath)
    if (pkg === 'lib') {
      return acc
    }

    return {
      ...acc,
      [pkg]: (acc[pkg] || []).concat(name),
    }
  }, {} as Record<string, string[]>)

  await fs.writeFile(`${outDir}/dictionary.json`, JSON.stringify(dictionary))
}

async function main(): Promise<void> {
  console.info(`» Start icons building process`)

  await setup()

  console.debug(`» Downloading icons from react-icons v${REACT_ICONS_VERSION} archive...`)
  await downloadReactIconsPackage()
  console.debug('» Icon files downloaded and extracted')

  await buildMiaIcons()
  console.debug('» Mia-Platform icons built')

  await buildIconDictionary()
  console.debug('» Icon dictionary built')
}

main()
  .then(() => console.log('✔️ Icons built correctly'))
  .catch((error) => console.error('Error building icons', error))
