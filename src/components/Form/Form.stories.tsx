import { ReactElement, useState } from 'react'
import { Flex } from 'antd'
import { Meta } from '@storybook/react'

import * as validators from './utils/validators.ts'
import { Button } from '../Button'
import { Card } from '../Card'
import { Checkbox } from '../Checkbox'
import { CheckboxGroup } from '../CheckboxGroup'
import { Form } from './Form.tsx'
import { FormItem } from './FormItem.tsx'
import { Input } from '../Input'
import { InputNumber } from '../InputNumber'
import { RadioGroup } from '../RadioGroup'
import { Search } from '../Search'
import { Select } from '../Select'
import { Switch } from '../Switch'
import { TextArea } from '../TextArea'

const meta = {
  component: Form,
  args: {},
  argTypes: {},
} satisfies Meta<typeof Form>

export default meta
// type Story = StoryObj<typeof meta>

const options = [
  ...Array(3).keys(),
].map((id) => ({
  value: `value ${id + 1}`,
  label: `label ${id + 1}`,
}))

const formValuesDebugger = (values: Record<string, unknown>): ReactElement => {
  return (
    <div style={{ gridColumn: '-1 / 1', marginBottom: 24 }}>
      <Card>
        <pre>{JSON.stringify(values, null, '\t')}</pre>
      </Card>
    </div>
  )
}

export const ComplexForm = (): ReactElement => {
  const [values, setValues] = useState<Record<string, unknown>>({
    textfield: 'textfield',
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
  })

  return (
    <Form<Record<string, unknown>>
      columns={3}
      gap={32}
      initialValues={values}
      layout="vertical"
      onValuesChange={(_, formValues) => setValues(formValues)}
    >
      {formValuesDebugger(values)}
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
            onChange(Number(value) + 1)
          }
          return (
            <Button onClick={handleClick}>{`clicked ${value} times`}</Button>
          )
        }}
      </FormItem>
      <FormItem
        name="password"
        rules={[validators.required('password is required')]}
      >
        <Input type={Input.Type.Password} />
      </FormItem>
      <FormItem
        name="confirmPassword"
        rules={[
          validators.required('confirm password is required'),
          validators.checkEquals('password', "password and confirm password don't match!"),
        ]}
      >
        <Input type={Input.Type.Password} />
      </FormItem>
    </Form>
  )
}
