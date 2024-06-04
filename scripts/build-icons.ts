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

import { Cheerio, Element, load } from 'cheerio'
import { IconTree } from 'react-icons'
import camelcase from 'camelcase'
import { createRequire } from 'module'
import fs from 'fs/promises'
import { glob } from 'glob'
import path from 'path'
import url from 'url'

const require = createRequire(import.meta.url)
const reactIconsPath = path.dirname(require.resolve('react-icons/package.json'))

const dirname = path.dirname(url.fileURLToPath(import.meta.url))
const rootDir = path.resolve(dirname, '..')
const outDir = path.resolve(rootDir, 'icons')

const reactIconsPackages = ['ai', 'fi', 'pi']

async function initialize(): Promise<void> {
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

async function copyReactIconsPackages(): Promise<void> {
  const packagesToCopy = ['lib', ...reactIconsPackages]

  const promises = packagesToCopy.map((packageName) => {
    const source = path.resolve(reactIconsPath, packageName)
    const dest = path.resolve(outDir, packageName)

    return fs.cp(source, dest, { recursive: true })
  })

  await Promise.all(promises)
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
          child: children?.length ? elementToTree($doc(children) as Cheerio<Element>) : [],
        }))
        .get()
    )
  }

  const tree = elementToTree($svg)
  return tree[0]
}

async function buildMiaIcons(): Promise<void> {
  const miaIconsPackageDir = path.resolve(outDir, 'mia')
  await fs.mkdir(miaIconsPackageDir)

  const packageJsonPath = path.resolve(miaIconsPackageDir, 'package.json')
  const esmIndexPath = path.resolve(miaIconsPackageDir, 'index.mjs')
  const cjsIndexPath = path.resolve(miaIconsPackageDir, 'index.js')
  const declarationsPath = path.resolve(miaIconsPackageDir, 'index.d.ts')

  await fs.appendFile(
    packageJsonPath,
    '{\n  "sideEffects": false,\n  "module": "./index.esm.js"\n}',
    'utf-8'
  )

  await fs.appendFile(
    esmIndexPath,
    '// THIS FILE IS AUTO GENERATED\nimport { GenIcon } from \'../lib\';\n',
    'utf-8'
  )

  await fs.appendFile(
    cjsIndexPath,
    '// THIS FILE IS AUTO GENERATED\nvar GenIcon = require(\'../lib\').GenIcon\n',
    'utf-8'
  )

  await fs.appendFile(
    declarationsPath,
    '// THIS FILE IS AUTO GENERATED\nimport { IconType } from \'../lib\'\n',
    'utf-8'
  )

  const svgFiles = await glob(path.resolve(rootDir, 'src/assets/icons/*.svg'))

  const promises = svgFiles.map(async(filePath) => {
    const iconNameRaw = path.basename(filePath, path.extname(filePath))
    const iconName = camelcase(iconNameRaw, { pascalCase: true })

    const svgStr = await fs.readFile(filePath, 'utf-8')

    const iconTree = await svgStringToTree(svgStr)
    const iconTreeStr = JSON.stringify(iconTree)

    const esmTemplate = `export function ${iconName} (props) {\n`
    + `  return GenIcon(${iconTreeStr})(props);\n`
    + `};\n`

    const cjsTemplate = `module.exports.${iconName} = function ${iconName} (props) {\n`
    + `  return GenIcon(${iconTreeStr})(props);\n`
    + `};\n`

    const declarationsTemplate = `export declare const ${iconName}: IconType;\n`

    await fs.appendFile(esmIndexPath, esmTemplate, 'utf-8')
    await fs.appendFile(cjsIndexPath, cjsTemplate, 'utf-8')
    await fs.appendFile(declarationsPath, declarationsTemplate, 'utf-8')
  })

  await Promise.all(promises)
}

async function main(): Promise<void> {
  await initialize()
  await copyReactIconsPackages()
  await buildMiaIcons()
}

main()
  .then(() => console.log('✔️ Icons built correctly'))
  .catch((error) => console.error('Error building icons', error))
