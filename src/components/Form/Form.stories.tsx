import { Fragment, ReactElement } from 'react'
import { Meta, type StoryObj } from '@storybook/react'
import { Flex } from 'antd'

import { BodyM } from '../Typography/BodyX/BodyM'
import { Button } from '../Button'
import { Card } from '../Card'
import { Checkbox } from '../Checkbox'
import { CheckboxGroup } from '../CheckboxGroup'
import { Form } from './Form.tsx'
import { FormItem } from './FormItem/FormItem.tsx'
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
        <FormItem name="firstName">
          <Input />
        </FormItem>
        <FormItem name="lastName">
          <Input />
        </FormItem>
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
          <FormItem name="firstName">
            <Input />
          </FormItem>
          <FormItem name="lastName">
            <Input />
          </FormItem>
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
      <FormItem
        name="firstName"
        rules={[{ validator: () => Promise.reject(new Error('Validation error')) }]}
      >
        {() => <Input />}
      </FormItem>
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
        <FormItem isFullWidth name="inputAddon" rules={[{ required: true }]}>
          <Input addonBefore={{ type: Input.AddonType.Select, options }} />
        </FormItem>
        <FormItem name="textfield" rules={[{ required: true }]}>
          <Input />
        </FormItem>
        <FormItem name="textarea" rules={[{ required: true }]}>
          <TextArea />
        </FormItem>
        <FormItem name="number" rules={[{ required: true }]} >
          <InputNumber />
        </FormItem>
        <FormItem name="search" rules={[{ required: true }]} span={2}>
          <Search options={options} />
        </FormItem>
        <FormItem name="select" rules={[{ required: true }]}>
          <Select options={options} />
        </FormItem>
        <Flex
          gap={16}
          justify="space-between"
          style={{ gridColumn: '-1 / 1' }}
        >
          <FormItem name="checkbox" rules={[{ required: true }]} >
            <Checkbox />
          </FormItem>
          <FormItem name="switch" rules={[{ required: true }]} >
            <Switch />
          </FormItem>
          <FormItem name="checkboxGroup" rules={[{ required: true }]}>
            <CheckboxGroup
              direction={CheckboxGroup.Direction.Horizontal}
              options={options}
            />
          </FormItem>
          <FormItem name="radioGroup" rules={[{ required: true }]}>
            <RadioGroup
              direction={RadioGroup.Direction.Horizontal}
              options={options}
            />
          </FormItem>
        </Flex>
        <FormItem name="custom">
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
        </FormItem>
        <FormItem
          name="password"
          rules={[Form.Validators.required('password is required')]}
        >
          <Input type={Input.Type.Password} />
        </FormItem>
        <FormItem
          name="confirmPassword"
          rules={[
            Form.Validators.required('confirm password is required'),
            Form.Validators.checkEquals('password', "password and confirm password don't match!"),
          ]}
        >
          <Input type={Input.Type.Password} />
        </FormItem>
        <FormItem isFullWidth label={<BodyM isBold>Form values:</BodyM>} shouldUpdate>
          {
            ({ form }) => (
              <Card>
                <pre>{JSON.stringify(form?.getFieldsValue(true), null, '\t')}</pre>
              </Card>
            )
          }
        </FormItem>
      </Fragment>
    ),
  },
}
