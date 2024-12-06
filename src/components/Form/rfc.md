
# Design System: Form Implementation Analysis

## Introduction

We need to develop a form component for the design system library with the following goals:

- **Compatibility:** It must be fully compatible with all input components included in the library.
- **Feature Parity:** It should offer functionality comparable to that of the older `reactord` library.
- **Ease of Use:** It should simplify form component development by minimizing boilerplate code.

The design system inputs to be integrated include the following:

- **Input Text:** Must support an `inputAddon` feature, allowing nested input functionality and proper state management.
- **Text Area**
- **Input Number**
- **Search**
- **Select**
- **Checkbox:** There are signature changes compared to `antd`; the `checked` property has been renamed to `isChecked`.
- **Checkbox Group**
- **Switch:** Similar to Checkbox, the `checked` property has been renamed to `isChecked`.
- **Radio Group**
- **Button:** Must handle form submission with `type="submit"`.
## Context

The implementation of the `reactord` form component accepts the following options:

| Prop Name                      | Description                                                                                                                                                                               |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| cleanFieldsOnSubmit            | Cleans fields on submit. This doesn't work when submitting on blur.                                                                                                                        |
| customActions                  | Custom actions rendered at the bottom-right of the form (e.g., for a Wizard component). Takes the `antd` form object as a parameter. This doesn't work with `onSubmit`.                    |
| customActionsPlacement         | Manages the placement of the submit button and any additional actions in the form.                                                                                                        |
| fields                         | Accepts either an array of fields or a function returning an array. The function takes the `antd` form object as a parameter. Requires 2 params: `type` and `[valueKey]` (default: `id`). |
| forceValidationOnChange        | Forces validation on all fields when set to `true`, or on a specified subset of fields.                                                                                                  |
| form                           | `antd` form object passed by a higher-order component (HOC).                                                                                                                              |
| formContainer                  | Style settings for the container where the form is placed.                                                                                                                                |
| groups                         | Properties for each group defined in `fields`.                                                                                                                                           |
| id                             | ID assigned to the form HTML element.                                                                                                                                                     |
| layout                         | Form layout configuration.                                                                                                                                                               |
| maxNumberOfColumns             | Maximum number of columns in the form.                                                                                                                                                    |
| onBlur                         | Required if `onSubmit` is not set.                                                                                                                                                        |
| onChange                       | Change handler for each input.                                                                                                                                                            |
| onKeyPressEnabled              | Enables submission when pressing the Enter key.                                                                                                                                           |
| onSubmit                       | Required if `onBlur` is not set.                                                                                                                                                          |
| showSubmitButton               | Set to `true` to display the submit button when `onSubmit` is set.                                                                                                                         |
| submitButton                   | Boolean determining whether to show the submit button.                                                                                                                                     |
| valueKey                       | Specifies the required value for each field.                                                                                                                                               |

### Key Functionalities Enabled by These Props

1. **Simplified Rendering of Common Components**  
   These include features such as a **submit button**, **custom actions**, **wizard elements**, and layout management (e.g., **column alignment**, button positioning, or forms within modals).

2. **Unified Handlers and Behaviors for Input Interactions**  
   Props like `onChange` and `onBlur` ensure consistent behavior for inputs, while configuration options such as `cleanFieldsOnSubmit` apply to all fields, and `groups` allow targeting specific subsets of fields.

3. **Unified Initialization of All Inputs via a Single `fields` Prop**  
   The `fields` prop enables seamless initialization of input components, while still allowing for more advanced input logic when needed.

### Limitations

- **Layout Customization:**  
  The layout is **not highly customizable**, as it relies solely on basic configuration props at the parent component level. This makes it **difficult to insert intermediate components or wrappers** between the parent form and individual inputs.

- **Custom Input Implementation:**  
  The `fields` prop is based on **getInputDecorator**, which is **deprecated in Ant Design 5**. A new strategy is required for creating custom input components outside the design system.

- **Form State Management and Validation:**  
  Form state management is implemented in the parent component using the parent form’s state, which is currently implemented with a **class component**. This approach is now deprecated in more recent versions of React.

## Proposal/Design

The purpose of this analysis is to provide guidelines and an implementation strategy addressing the limitations highlighted above.

### Layout Customization

Given the limitations of configuring form fields via the `fields` prop, the proposal is to **deprecate this property** and instead define form items directly using React elements. The form items would be configured through the props supported by the component.

This approach allows for a seamless coexistence of form items and custom elements within the DOM:

```jsx
<Form>
  <FormItem name="input-name" {...fieldProps} />
  <div>
    <p>Some custom text</p>
  </div>
</Form>
```

#### Column Layout

To simplify structuring the form with a typical column layout, the default approach should utilize the [CSS Grid Layout](https://css-tricks.com/snippets/css/complete-guide-grid/).  
This approach offers the following advantages:

- Allows configuration of various style properties (e.g., number of columns, spacing between fields) directly from the parent component (the form).
- Avoids the need for specific wrappers around individual fields, enabling customization through straightforward CSS properties.

##### Layout Properties for the Parent Component (Form)

The suggestion is to apply the `display: grid` property by default to the _Form_ component.  
Using this property, key grid layout features can be implemented by defining simple props on the component:

- **columns** _(type: number, default = 2)_: This property allows specifying the number of columns in the form. To implement this functionality, the following CSS property is applied to the _Form_ component:
```js
// A form row consists of <columns> fractions (columns)
grid-template-columns: `repeat(${columns}, 1fr)`
```

- **spacing** _(type: number, default = 16)_: This property allows specifying the spacing between the grid elements. It is implemented using the following CSS property:
```js
// Grid items are separated by a margin of <spacing>px
column-gap: ``${spacing}px``

```
##### Layout Properties for Child Components (FormItem)

Thanks to the `display: grid` property, it is possible to configure helper functionalities on form elements to control the rendering of individual fields:

- **span** _(type: number, default = 1)_: Specifies how many columns the form item should span. This can be implemented with the following CSS property:
```js
// The form item spans across <span> columns
grid-column: `span ${span}`
```
- **isFullWidth** _(type: boolean, default = false)_: A shorthand for setting the form item’s width to span across all columns defined in the form. This is achieved with the following CSS property:
```js
// Extends the element from the first to the last column in the grid
grid-column: `1 / -1`;
```

> Both the `Form` and `FormItem` components have a `style` property that allows overriding their default layout. For example, if we want to disable the grid layout on the form, we can simply pass the `display: block` style to it.

> It is also possible to nest `FormItem` components inside wrapper components within the form. However, in this case, the properties `_span_` and `_isFullWidth_` will no longer be applicable.

#### Submit Button

To simplify the rendering of the common _Button_ component for form submission, the `submitButton` property is introduced on the parent component.  
To ensure flexibility in implementation, the following type definition for the prop is suggested:

```ts
submitButton: boolean | string | ((form: FormInstance) => ReactNode)
```
The rendering of the button will be implemented through the following simplified approach:

```ts
const defaultSubmitButton = (label: ReactNode = 'Submit'): ReactNode => {
  return (
    <Button htmlType={Button.HTMLType.Submit}>
      {label}
    </Button>
  )
}

const renderSubmitButton = (
  form: FormInstance,
  submitButtonProp: boolean | string | ((form: FormInstance) => ReactNode)
): ReactNode => {
  switch (typeof submitButtonProp) {
  case 'boolean':
    return submitButtonProp && defaultSubmitButton()
  case 'string':
    return defaultSubmitButton(submitButtonProp)
  case 'function':
    return submitButtonProp(form)
  default:
  }
}

```
The following cases arise for the `submitButton` prop:
- **If the prop is `boolean`:** The button is not shown if the value is `false`; otherwise, the default button component is rendered.
- **If the prop is `string`:** The value of the prop will be used as the custom label displayed inside the button.
  > Note: This is a simplified scenario. In real cases, the label is likely to be a `FormattedMessage`, which is an object (ReactNode). In this case, the function can be adjusted to check if the label is valid, for example using React's `isValidElement` function.
- **If the prop is of type `function`:**  The value of the prop will be treated as a **render function** that receives an instance of the form. This is useful for implementing custom actions inside the form footer, as shown in the following example:

```tsx
<Form 
  submitButton={(form) => {
    return (
      <Flex gap={16}>
        <Button onClick={form.resetFields}>
          Clear form
        </Button>
        {defaultSubmitButton()}
      </Flex>
    )
  }}
/>
```

**Adding the submit button directly in the DOM**
For maximum flexibility, it is still possible to manually include the form button by adding it as a child within the component:
```jsx
<Form 
  submitButton={false}
>
  ...
  <Button type={Button.HtmlType.Submit}>Submit</Button>
</Form>
```
Furthermore, you can even place the button outside a form taking advantage of the native html attribute `form` of the button component:
```jsx
<Form 
  submitButton={false} 
  id="my-form"
/>
  ...
<Button
  type={Button.HtmlType.Submit}
  form="my-form"
>
  Submit
</Button>
```


### Customization of Components

In **Ant Design 5**, the `getInputDecorator` method has been deprecated. For creating custom input components, the recommended approach is outlined in [Ant Design's documentation](https://ant.design/components/form#form-demo-customized-form-controls). This involves implementing the input component to support the following props:

- **value**: The value of the input controlled by the form.
- **onChange**: A handler triggered when the input value changes, used by the form to update its internal state for the specific field.

Additionally, the following props from Ant Design can be configured directly on the _FormItem_:

| Prop Name             | Type                   | Description                                                                                            |
|-----------------------|------------------------|--------------------------------------------------------------------------------------------------------|
| **valuePropName**     | `string`               | Specifies a custom name for the `value` property of the input.                                         |
| **getValueFromEvent** | `(args: any[]) => any` | Specifies how to extract the future value of the input from the parameters of the `onChange` function. |

#### Integration of Components Present in the Library

Not all components in the design system fully comply with the Ant Design specification outlined above. For this reason, the idea is to implement the `FormItem` component using a switch to "adapt" the props based on the component passed as an argument.

> _Example:_ The `Checkbox` component uses `isChecked` as its equivalent of the `value` property. Therefore, it is necessary to pass `"isChecked"` as the default value for the `valuePropName` prop for all inputs using this type.

To achieve this, the following function is implemented within the `FormItem` component to extract default properties based on the `component` prop:

```js
const getDefaultFormItemProps = ({type}: ReactElement) => {
  switch (type) {
    ...
      // Handle each supported design-system component within the function
    ...  
    case Checkbox: // Reference to the `Checkbox` component from the design-system
      return {
        valuePropName: 'isChecked',
        // The next value of the checkbox is extracted from the click event as follows:
        getValueFromEvent: (event) => event.target.checked, 
      }
    default:
      // If the component is external to the library, do not set any defaults
      return {}
    ...
  }
}
```

La funzione `getDefaultFormItemProps` dunque viene utilizzata nel rendering del componente come segue:

```js
export const FormItem = ({children, ...props}) => {
  
  const defaultComponentProps = useMemo(() => {
    if (isValidElement(children)){
      return getDefaultFormItemProps(children)
    }
    return {}
  }, [])
  
  return (
    <AntForm.Item 
      {...defaultComponentProps}
      { ...formItemProps}
    >
      {children}
    </AntForm.Item>
  )
}
```
To instantiate a _FormItem_ of type _Checkbox_, the following code can be used:

```jsx
<FormItem
  rules={[{ required: true }]}
  name="inputName"
  label="Form item label" 
  // la proprietà "valuePropName" è omessa, e inferita all'inerno del FormItem
>
  <Checkbox label="Checkbox label"/>
</FormItem>

```

#### Integration of External Components into the Library

To include custom components in the form, you simply need to implement the input to properly handle the `value` and `onChange` props. Additionally, you may specify the `valuePropName` or `getValueFromEvent` properties directly on the `FormItem`, along with the remaining input-specific properties.

```jsx
<FormItem 
  name="customInputName"
  rules={[{ required: true }]}
  valuePropName="customInputValue"
  getValueFromEvent={(event) => event.customInputValue}
  >
  <CustomInput customInputProp="some prop" />
</FormItem>
```

If the input requires form values for its functionality, you can use the [Form.useFormInstance](https://ant.design/components/form#formuseforminstance) and [Form.useWatch](https://ant.design/components/form#formusewatch) hooks from Ant Design inside the component, or use the implementation approach described in the following section.

#### "In-place" Implementation of Input Components

Sometimes it can be convenient to implement inputs "in-place" within the form: for example, when the component is one of those internal to the design system but still requires custom implementations for its value or customization.  
For this reason, it is also possible to implement a FormItem using a _render function_ passed as children to the FormItem component: in this case, an instance of the form along with the correct `value` and `onChange` values will be directly accessible within the render function.

```jsx
<FormItem 
  name="customRenderInput"
>
  {
    ({ value = 0, onChange, form }) => {
      const handleClick = () => {
        onChange(value + 1)
      }
      return (<Button onClick={handleClick}>{`clicked ${value} times`}</Button>)
    }
  }
</FormItem>
```

To implemente the _FormItem_ component this way, the following edit is needed to its implementation: 

```js
export const FormItem = ({children, ...props}) => {
  ...
  const inputElement = useMemo(() => {
    if (isValidElement(children)) {
      return children
    } else if (typeof children === 'function') {
      const CustomInput = children
      return (
        <CustomInput
          form={form}
          value={form.getFieldValue(name)}
          onChange={(value) => {
            form.setFieldValue(name, value)
          }}
        />
      )
    }
    return undefined
  }, [form, name, children])
  
  return (
    <AntForm.Item 
      {...defaultComponentProps}
      { ...formItemProps}
    >
      {inputElement}
    </AntForm.Item>
  )
}
```

### Managing Shared Form State and Validation

#### Field Validation

Field validation is natively possible through the features provided by the antd library.  
You can configure the validation of a field by assigning the `rules` prop to the _FormItem_.  
The `rules` property is defined as follows:

```ts
type Rule = RuleConfig | ((form: FormInstance) => RuleConfig);
```
Some notable fields of the RuleConfig type are listed in the table:

| Field        | Type                       | Description                                                                                                               |
|--------------|----------------------------|---------------------------------------------------------------------------------------------------------------------------|
| `required`   | `boolean`                  | Indicates if the field is required. If `true`, it automatically generates an error message if the field is not filled in. |
| `message`    | `string`                   | Error message to display when the rule is not satisfied.                                                                  |
| `type`       | `string`                   | Specifies the type of data to validate, such as `string`, `number`, `email`, `url`, etc.                                  |
| `len`        | `number`                   | Validates the exact length of the value (only applies to strings, arrays, etc.).                                          |
| `min`        | `number`                   | Validates the minimum length (for strings) or the minimum value (for numbers).                                            |
| `max`        | `number`                   | Validates the maximum length (for strings) or the maximum value (for numbers).                                            |
| `pattern`    | `RegExp`                   | Validates the value using a regular expression.                                                                           |
| `validator`  | `(rule, value) => Promise` | A custom function to validate the value. It must return a promise that resolves if valid or rejects if not valid.         |
| `whitespace` | `boolean`                  | If `true`, considers the field invalid if it contains only whitespace (only applies to strings).                          |

Il campo `validator` della rule risulta particolarmente comodo nel definire regole di validazione custom. Ad esempio, se vogliamo implemnetare un form di salvataggio password, possiamo definire i nostri campi come segue:

Per ridurre la scrittura di codice nei progetti che utilizzano la libreria, è esposta dalla libreria un insieme di validatori di uso comune nel file `/src/components/Form/utlis/validators.ts`:

```ts
// /src/components/Form/utlis/validators.ts

export const required = (message?: string): RuleConfig => {
  return {
    message: message || 'The field is required',
    required: true,
  }
}

export const checkEquals = (fieldName: string, message?: string) => {
  return ({ getFieldValue }: FormInstance): RuleConfig => {
    validator: (_, value) => {
      if (!value || getFieldValue(fieldName) === value) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error(message || `The entered value do not match the vaule of "${fieldName}"`));
    }
  }
}
```
In base alla snippet precedente, se vogliamo implemnetare un form di salvataggio password, possiamo definire i nostri campi come segue:

```jsx
<FormItem 
  name="password"
  label="Insert Password"
  rules={[validators.required("password is required")]}
>
  <Input type={Input.Type.Password}/>
</FormItem>
<FormItem 
  name="confirm" 
  label="Confirm Password" 
  dependencies={["password"]}
  rules={[
    validators.required("confirm password is required"),
    validators.checkEquals('password', "password and confirm password don't match!")
  ]}
>
  <Input type={Input.Type.Password}/>
</FormItem>
```
#### Changes Compared to reactord

- The previous reactord library added some default validation rules based on the input type, to verify that the type matched the one actually supported natively by the input.

> _Example:_ For a `Switch` type FormItem, the rule `{type: "boolean"}` was added by default.

To encourage cleaner code, it is recommended to ignore this implementation in the new library and delegate the implementation of this rule to the user's code if necessary.

- In reactord, the `required` prop of the FormItem, used to display the asterisk next to the field to visually indicate it was required, was inferred by checking if any of the objects in the `rules` prop defined the `required: true` property.

In favor of simpler implementation, it is also recommended to omit this implementation and delegate the specification of the `required` prop to the component user for correct visualization.

## Implementation steps

For the actual implementation of the Form and FormItem components, the following additional steps are required:

### FormItem
  - Complete specification of the props accepted by the component
  - Validation of the component's style according to the specification in Figma
  - Addition of new features or porting of existing graphical features from Reactord (eg. infoBox)

**Estimate:**  (~1 g)

### Form
  - Complete specification of the props accepted by the component
  - Validation of the component's style according to the specification in Figma
  - (Optional) Consider implementing solutions to facilitate the migration of old forms according to the specification from the previous _Reactord_ library.
    (_example:_ implementation of a function that creates _FormItem_ components from the `fields` array in the old library).

**Estimate:**  (~2 g)
