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

import type { Meta, StoryObj } from '@storybook/react'
import { ReactElement, useState } from 'react'
import { action } from '@storybook/addon-actions'
import { themes } from 'prism-react-renderer'

import { CodeEditor } from './CodeEditor'

const sampleJavaScript = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate the 10th Fibonacci number
console.log(fibonacci(10));`

const sampleTypeScript = `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", isActive: true },
  { id: 2, name: "Jane Smith", email: "jane@example.com", isActive: false }
];

function getActiveUsers(users: User[]): User[] {
  return users.filter(user => user.isActive);
}`

const sampleJSON = `{
  "name": "@mia-platform/design-system",
  "version": "1.0.0",
  "description": "A modern design system",
  "main": "dist/index.js",
  "scripts": {
    "build": "vite build",
    "test": "jest",
    "storybook": "storybook dev"
  },
  "dependencies": {
    "react": "^18.0.0"
  }
}`

const sampleCSS = `.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.title {
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
}`

const sampleHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sample HTML</title>
</head>
<body>
  <header>
    <h1>Welcome to Our Website</h1>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <p>This is a sample HTML document.</p>
  </main>
</body>
</html>`

const InteractiveCodeEditor = ({
  initialCode,
  language,
  isDisabled = false,
  theme = themes.vsLight,
}: {
  initialCode: string
  language: string
  isDisabled?: boolean
  theme?: typeof themes.nightOwl
}): ReactElement => {
  const [code, setCode] = useState(initialCode)

  return (
    <CodeEditor
      code={code}
      isDisabled={isDisabled}
      language={language}
      theme={theme}
      onChange={setCode}
    />
  )
}

const meta = {
  component: CodeEditor,
  parameters: {
    layout: 'padded',
  },
  args: {
    code: sampleJavaScript,
    language: 'javascript',
    isDisabled: false,
    theme: themes.nightOwl,
    onChange: action('change'),
  },
  argTypes: {
    language: {
      control: { type: 'select' },
      options: ['javascript', 'typescript', 'json', 'css', 'html', 'jsx', 'tsx', 'python', 'bash'],
    },
    theme: {
      control: { type: 'select' },
      options: Object.keys(themes),
      mapping: themes,
    },
  },
} satisfies Meta<typeof CodeEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <InteractiveCodeEditor
      initialCode={args.code}
      isDisabled={args.isDisabled}
      language={args.language}
      theme={args.theme}
    />
  ),
}

export const JavaScript: Story = {
  render: () => (
    <InteractiveCodeEditor
      initialCode={sampleJavaScript}
      language="javascript"
    />
  ),
}

export const TypeScript: Story = {
  render: () => (
    <InteractiveCodeEditor
      initialCode={sampleTypeScript}
      language="typescript"
    />
  ),
}

export const JSON: Story = {
  render: () => (
    <InteractiveCodeEditor
      initialCode={sampleJSON}
      language="json"
    />
  ),
}

export const CSS: Story = {
  render: () => (
    <InteractiveCodeEditor
      initialCode={sampleCSS}
      language="css"
    />
  ),
}

export const HTML: Story = {
  render: () => (
    <InteractiveCodeEditor
      initialCode={sampleHTML}
      language="html"
    />
  ),
}

export const Disabled: Story = {
  render: () => (
    <InteractiveCodeEditor
      initialCode={sampleJavaScript}
      isDisabled={true}
      language="javascript"
    />
  ),
}

export const LightTheme: Story = {
  render: () => (
    <InteractiveCodeEditor
      initialCode={sampleTypeScript}
      language="typescript"
      theme={themes.github}
    />
  ),
}

export const DarkTheme: Story = {
  render: () => (
    <InteractiveCodeEditor
      initialCode={sampleJavaScript}
      language="javascript"
      theme={themes.vsDark}
    />
  ),
}

export const PaletteTheme: Story = {
  render: () => (
    <InteractiveCodeEditor
      initialCode={sampleCSS}
      language="css"
      theme={themes.shadesOfPurple}
    />
  ),
}

export const MinimalCode: Story = {
  render: () => (
    <InteractiveCodeEditor
      initialCode="console.log('Hello, World!');"
      language="javascript"
    />
  ),
}

export const EmptyEditor: Story = {
  render: () => (
    <InteractiveCodeEditor
      initialCode=""
      language="javascript"
    />
  ),
}
