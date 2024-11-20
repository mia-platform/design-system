import { ReactElement, useState } from 'react'
import { Meta } from '@storybook/react'

import { Button } from '../Button/Button.tsx'
import { Checkbox } from '../Checkbox'
import { CheckboxGroup } from '../CheckboxGroup'
import { Form } from './Form.tsx'
import { FormItem } from './FormItem.tsx'
import { Input } from '../Input/Input.tsx'
import { InputNumber } from '../InputNumber'
import { RadioGroup } from '../RadioGroup'
import { Search } from '../Search'
import { Select } from '../Select'
import { Switch } from '../Switch'
import { TextArea } from '../TextArea'
import { TextCompletion } from '../TextCompletion/TextCompletion.tsx'

const meta = {
  component: Form,
  args: {},
  argTypes: {
  },
} satisfies Meta<typeof Form>

export default meta
// type Story = StoryObj<typeof meta>

const options = [
  ...Array(5).keys(),
].map((id) => ({
  value: `value ${id + 1}`,
  label: `label ${id + 1}`,
}))

export const ComplexForm = () : ReactElement => {
  const [values, setValues] = useState({
    textfield: 'textfield',
    textarea: 'textarea',
    number: 1,
    search: options[0].value,
    select: options[0].value,
    checkboxGroup: [options[0].value],
    inputAddon: { after: options[0].value },
    textCompletion: '',
  })

  return (
    <div>
      <pre style={{ padding: 16, marginBottom: 16, background: 'white', borderRadius: 4 }}>
        {JSON.stringify(values, null, '\t')}
      </pre>
      <Form
        initialValues={values}
        layout="vertical"
        onValuesChange={(_, formValues) => setValues(formValues)}
      >
        <FormItem name="textCompletion">
          <TextCompletion />
        </FormItem>
        <FormItem
          getValueFromEvent={(_, value) => value}
          getValueProps={(value) => value?.value}
          name="withAddon"
        >
          <Input addonBefore={{ type: Input.AddonType.Select, options }} />
        </FormItem>
        <FormItem name="textfield" rules={[{ required: true }]}>
          <Input />
        </FormItem>
        <FormItem name="textarea" rules={[{ required: true }]}>
          <TextArea />
        </FormItem>
        <FormItem name="number" rules={[{ required: true }]}>
          <InputNumber />
        </FormItem>
        <FormItem name="search" rules={[{ required: true }]}>
          <Search options={options} />
        </FormItem>
        <FormItem name="select" rules={[{ required: true }]}>
          <Select allowClear options={options} />
        </FormItem>
        <FormItem
          getValueFromEvent={(event) => event.target.checked}
          name="checkbox"
          rules={[{ required: true }]}
          valuePropName="isChecked"
        >
          <Checkbox />
        </FormItem>
        <FormItem name="checkboxGroup" rules={[{ required: true }]}>
          <CheckboxGroup options={options} />
        </FormItem>
        <FormItem name="switch" rules={[{ required: true }]} valuePropName="isChecked">
          <Switch />
        </FormItem>
        <FormItem
          getValueFromEvent={(event) => event.value}
          name="radioGroup"
          rules={[{ required: true }]}
        >
          <RadioGroup options={options} />
        </FormItem>
        <FormItem rules={[{ required: true }]}>
          <Button htmlType={Button.HTMLType.Submit}>Submit</Button>
        </FormItem>
      </Form>
    </div>
  )
}
