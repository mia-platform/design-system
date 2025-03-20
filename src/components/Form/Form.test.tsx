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
import { screen, waitFor } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'

import { Button } from '../Button/Button.tsx'
import { Form } from './Form.tsx'
import { Input } from '../Input'
import { render } from '../../test-utils.tsx'

const exampleText = 'text'

const props = {
  children: (
    <Fragment>
      <Form.Item name="firstName" rules={[Form.Validators.required()]}>
        <Input />
      </Form.Item>
      <Form.Item name="lastName" rules={[Form.Validators.required()]}>
        <Input />
      </Form.Item>
    </Fragment>
  ),
}

describe('Form Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('renders correctly', async() => {
    const { asFragment } = render(<Form {...props} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders horizontal correctly', async() => {
    const { asFragment } = render(<Form layout={Form.Layout.Horizontal} {...props} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders custom gap correctly', async() => {
    const { asFragment } = render(<Form gap={64} {...props} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders custom columns count correctly', async() => {
    const { asFragment } = render(<Form columns={3} {...props} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders initialValues correctly', async() => {
    const { asFragment } = render(<Form initialValues={{ firstName: 'foo', lastName: 'bar' }} {...props} />)
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })

  test('renders with custom submit button label', async() => {
    const { asFragment } = render(<Form submitButton={exampleText} {...props} />
    )
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
    expect(screen.getByText(exampleText)).toBeInTheDocument()
  })

  test('renders with custom submit button function', async() => {
    const submitButton = () : ReactElement => {
      return <Form.SubmitButton>{exampleText}</Form.SubmitButton>
    }
    const { asFragment } = render(<Form submitButton={submitButton} {...props} />
    )
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
    expect(screen.getByText(exampleText)).toBeInTheDocument()
  })

  test('renders with custom submit button function', async() => {
    const submitButton = () : ReactElement => {
      return <Form.SubmitButton>{exampleText}</Form.SubmitButton>
    }
    const { asFragment } = render(<Form submitButton={submitButton} {...props} />
    )
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
    expect(screen.getByText(exampleText)).toBeInTheDocument()
  })

  test('should call onFinishFailed if the form is not valid', async() => {
    const onFinishFailed = jest.fn()
    render(<Form onFinishFailed={onFinishFailed} {...props} />
    )
    const button = screen.getByRole('button', { name: 'Submit' })
    fireEvent.click(button)

    await waitFor(async() => {
      expect(onFinishFailed).toHaveBeenCalled()
    })

    expect(await screen.findAllByText('The field is required')).toHaveLength(2)
  })

  test('should fails test using instance if the form is not valid', async() => {
    const InlineForm = (): ReactElement => {
      const [form] = Form.useForm()
      const id = 'the-form'
      const onClick = (): void => {
        form.validateFields()
          .then(() => {
            throw new Error('Promise should not resolve')
          })
          .catch(({ errorFields }) => {
            expect(errorFields).toEqual([
              { 'errors': ['The field is required'], 'name': ['firstName'], 'warnings': [] },
              { 'errors': ['The field is required'], 'name': ['lastName'], 'warnings': [] },
            ])
          })
      }

      return (
        <>
          <Form
            form={form}
            id={id}
            submitButton={false}
          >
            <Form.Item name="firstName" rules={[Form.Validators.required()]}>
              <Input />
            </Form.Item>
            <Form.Item name="lastName" rules={[Form.Validators.required()]}>
              <Input />
            </Form.Item>
          </Form>
          <Button onClick={onClick} >{'Submit'}</Button>
        </>
      )
    }

    render(<InlineForm />)
    const button = screen.getByRole('button', { name: 'Submit' })
    fireEvent.click(button)

    expect(await screen.findAllByText('The field is required')).toHaveLength(2)
  })

  test('should call onFinish if the form is valid', async() => {
    const onFinish = jest.fn()
    render(<Form onFinish={onFinish} {...props} />
    )
    const button = screen.getByRole('button', { name: 'Submit' })

    const firstNameInput = screen.getByRole('textbox', { name: /firstname/i })
    const lastNameInput = screen.getByRole('textbox', { name: /lastname/i })

    fireEvent.change(firstNameInput, { target: { value: exampleText } })
    fireEvent.change(lastNameInput, { target: { value: exampleText } })

    fireEvent.click(button)

    await waitFor(async() => {
      expect(onFinish).toHaveBeenCalledWith({ firstName: exampleText, lastName: exampleText })
    })
  })
})
