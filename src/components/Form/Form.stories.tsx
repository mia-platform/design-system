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

import { Fragment, ReactElement } from 'react'
import { Meta, type StoryObj } from '@storybook/react'
import { Flex } from 'antd'

import { BodyM } from '../Typography/BodyX/BodyM'
import { Button } from '../Button'
import { Card } from '../Card'
import { Checkbox } from '../Checkbox'
import { CheckboxGroup } from '../CheckboxGroup'
import { Form } from './Form.tsx'
import { Input } from '../Input'
import { InputNumber } from '../InputNumber'
import { RadioGroup } from '../RadioGroup'
import { Search } from '../Search'
import { Select } from '../Select'
import { Switch } from '../Switch'
import { TextArea } from '../TextArea'

const meta = {
  component: Form,
  args: {
    children: (
      <Fragment>
        <Form.Item name="firstName">
          <Input />
        </Form.Item>
        <Form.Item name="lastName">
          <Input />
        </Form.Item>
      </Fragment>
    ),
  },
  argTypes: {},
} satisfies Meta<typeof Form>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  ...Array(3).keys(),
].map((id) => ({
  value: `value ${id + 1}`,
  label: `label ${id + 1}`,
}))

export const Default: Story = {
  args: {},
}

export const Horizontal: Story = {
  args: {
    layout: Form.Layout.Horizontal,
  },
}

export const WithInitialValues: Story = {
  args: {
    initialValues: {
      firstName: 'John',
      lastName: 'Doe',
    },
  },
}

export const WithCustomColumns = {
  args: {
    columns: 1,
  },
}

export const WithCustomGap: Story = {
  args: {
    columns: 1,
    gap: 160,
  },
}

export const WithCustomSubmit: Story = {
  args: {
    submitButton: ({ form }) => (
      <Flex gap={8}>
        <Button
          hierarchy={Button.Hierarchy.Danger}
          onClick={() => form?.resetFields()}
        >
          Clear fields
        </Button>
        <Form.SubmitButton />
      </Flex>
    ),
  },
}

export const WithDetachedSubmit = (): ReactElement => {
  const handleSubmit = (values: unknown): void => {
    alert(`onFinish:\n${JSON.stringify(values)}`)
  }
  return (
    <Flex align="center" justify="space-between">
      <Card>
        <Form id="my-form" submitButton={false} onFinish={handleSubmit}>
          <Form.Item name="firstName">
            <Input />
          </Form.Item>
          <Form.Item name="lastName">
            <Input />
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Form.SubmitButton form="my-form" />
      </Card>
    </Flex>
  )
}

export const WithValidation: Story = {
  args: {
    onFinishFailed: (reason: unknown) => {
      alert(`OnFinishFailed:\n${JSON.stringify(reason)}`)
    },
    children: (
      <Form.Item
        name="firstName"
        rules={[{ validator: () => Promise.reject(new Error('Validation error')) }]}
      >
        {() => <Input />}
      </Form.Item>
    ),
  },
}

export const ComplexForm: Story = {
  args: {
    columns: 3,
    initialValues: {
      input: 'input',
      textarea: 'textarea',
      number: 1,
      search: options[0].value,
      select: options[0].value,
      checkboxGroup: [options[0].value],
      inputAddon: { before: options[0].value, value: 'text' },
      switch: true,
      checkbox: true,
      radioGroup: options[0].value,
      custom: 0,
    },
    children: (
      <Fragment>
        <Form.Item isFullWidth name="inputAddon" rules={[{ required: true }]}>
          <Input addonBefore={{ type: Input.AddonType.Select, options }} />
        </Form.Item>
        <Form.Item name="textfield" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="textarea" rules={[{ required: true }]}>
          <TextArea />
        </Form.Item>
        <Form.Item name="number" rules={[{ required: true }]} >
          <InputNumber />
        </Form.Item>
        <Form.Item name="search" rules={[{ required: true }]} span={2}>
          <Search options={options} />
        </Form.Item>
        <Form.Item name="select" rules={[{ required: true }]} >
          <Select options={options} />
        </Form.Item>
        <Flex
          gap={16}
          justify="space-between"
          style={{ gridColumn: '-1 / 1' }}
        >
          <Form.Item name="checkbox" rules={[{ required: true }]} >
            <Checkbox />
          </Form.Item>
          <Form.Item name="switch" rules={[{ required: true }]} >
            <Switch />
          </Form.Item>
          <Form.Item name="checkboxGroup" rules={[{ required: true }]}>
            <CheckboxGroup
              direction={CheckboxGroup.Direction.Horizontal}
              options={options}
            />
          </Form.Item>
          <Form.Item name="radioGroup" rules={[{ required: true }]}>
            <RadioGroup
              direction={RadioGroup.Direction.Horizontal}
              options={options}
            />
          </Form.Item>
        </Flex>
        <Form.Item name="custom">
          {({ value, onChange }) => {
            const handleClick = (): void => {
              if (onChange) {
                onChange(Number(value) + 1)
              }
            }
            return (
              <Button onClick={handleClick}>{`clicked ${value} times`}</Button>
            )
          }}
        </Form.Item>
        <Form.Item
          name="password"
          rules={[Form.Validators.required('password is required')]}
        >
          <Input type={Input.Type.Password} />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            Form.Validators.required('confirm password is required'),
            Form.Validators.checkEquals('password', "password and confirm password don't match!"),
          ]}
        >
          <Input type={Input.Type.Password} />
        </Form.Item>
        <Form.Item isFullWidth label={<BodyM isBold>Form values:</BodyM>} shouldUpdate>
          {
            ({ form }) => (
              <Card>
                <pre>{JSON.stringify(form?.getFieldsValue(true), null, '\t')}</pre>
              </Card>
            )
          }
        </Form.Item>
      </Fragment>
    ),
  },
}
