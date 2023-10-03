import { fireEvent, render, screen } from '@testing-library/react'

import { Hierarchies, OptionsAlignments } from './Segmented.types'
import { labeledOptions, stringOptions } from './Segmented.mocks'
import { Segmented } from '.'

const { Primary } = Hierarchies
const { Vertical } = OptionsAlignments

describe('Segmented Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('labeled options', () => {
    const [, clickedOption, selectedOption, , controlledOption] = labeledOptions

    const onChange = jest.fn()

    const props = {
      defaultValue: selectedOption.key,
      options: labeledOptions,
      onChange,
    }

    test('renders options correctly', () => {
      const { asFragment } = render(<Segmented {...props} />)

      expect(screen.getByRole('list')).toBeVisible()

      labeledOptions.forEach(({ key }) => {
        const option = screen.getByRole('listitem', { name: key })

        expect(option).toBeVisible()
        expect(option).toHaveAttribute('aria-disabled', 'false')
      })

      expect(screen.getByRole('listitem', { name: selectedOption.key })).toHaveAttribute('aria-checked', 'true')

      expect(asFragment()).toMatchSnapshot()
    })

    test('renders primary options correctly', () => {
      const { asFragment } = render(<Segmented {...props} hierarchy={Primary} />)

      expect(screen.getByRole('list')).toBeVisible()

      labeledOptions.forEach(({ key }) => {
        const option = screen.getByRole('listitem', { name: key })

        expect(option).toBeVisible()
        expect(option).toHaveAttribute('aria-disabled', 'false')
      })

      expect(screen.getByRole('listitem', { name: selectedOption.key })).toHaveAttribute('aria-checked', 'true')

      expect(asFragment()).toMatchSnapshot()
    })

    test('renders vertical options correctly', () => {
      const { asFragment } = render(<Segmented {...props} optionsAlignment={Vertical} />)

      expect(screen.getByRole('list')).toBeVisible()

      labeledOptions.forEach(({ key }) => {
        const option = screen.getByRole('listitem', { name: key })

        expect(option).toBeVisible()
        expect(option).toHaveAttribute('aria-disabled', 'false')
      })

      expect(screen.getByRole('listitem', { name: selectedOption.key })).toHaveAttribute('aria-checked', 'true')

      expect(asFragment()).toMatchSnapshot()
    })

    test('renders disabled segmented correctly', () => {
      const { asFragment } = render(<Segmented {...props} isDisabled />)

      expect(screen.getByRole('list')).toBeVisible()

      labeledOptions.forEach(({ key }) => {
        const option = screen.getByRole('listitem', { name: key })

        expect(option).toBeVisible()
        expect(option).toHaveAttribute('aria-disabled', 'true')
      })

      expect(screen.getByRole('listitem', { name: selectedOption.key })).toHaveAttribute('aria-checked', 'true')

      expect(asFragment()).toMatchSnapshot()
    })

    test('select numeric default value correctly', () => {
      render(<Segmented {...props} defaultValue={2} />)

      expect(screen.getByRole('list')).toBeVisible()
      expect(screen.getByRole('listitem', { name: selectedOption.key })).toHaveAttribute('aria-checked', 'true')
    })

    test('select value correctly', () => {
      render(<Segmented {...props} value={controlledOption.key} />)

      expect(screen.getByRole('list')).toBeVisible()
      expect(screen.getByRole('listitem', { name: controlledOption.key })).toHaveAttribute('aria-checked', 'true')
    })

    test('select numeric value correctly', () => {
      render(<Segmented {...props} value={4} />)

      expect(screen.getByRole('list')).toBeVisible()
      expect(screen.getByRole('listitem', { name: controlledOption.key })).toHaveAttribute('aria-checked', 'true')
    })

    test('calls onChange correctly', () => {
      render(<Segmented {...props} />)

      fireEvent.click(screen.getByRole('listitem', { name: clickedOption.key }))

      expect(onChange).toBeCalledTimes(1)
      expect(onChange).toBeCalledWith(clickedOption)
    })
  })

  describe('string options', () => {
    const [, clickedOption, selectedOption, , controlledOption] = stringOptions

    const onChange = jest.fn()

    const props = {
      defaultValue: selectedOption,
      options: stringOptions,
      onChange,
    }

    test('renders options correctly', () => {
      const { asFragment } = render(<Segmented {...props} />)

      expect(screen.getByRole('list')).toBeVisible()

      stringOptions.forEach(name => {
        const option = screen.getByRole('listitem', { name })

        expect(option).toBeVisible()
        expect(option).toHaveAttribute('aria-disabled', 'false')
      })

      expect(screen.getByRole('listitem', { name: selectedOption })).toHaveAttribute('aria-checked', 'true')

      expect(asFragment()).toMatchSnapshot()
    })

    test('renders primary options correctly', () => {
      const { asFragment } = render(<Segmented {...props} hierarchy={Primary} />)

      expect(screen.getByRole('list')).toBeVisible()

      stringOptions.forEach(name => {
        const option = screen.getByRole('listitem', { name })

        expect(option).toBeVisible()
        expect(option).toHaveAttribute('aria-disabled', 'false')
      })

      expect(screen.getByRole('listitem', { name: selectedOption })).toHaveAttribute('aria-checked', 'true')

      expect(asFragment()).toMatchSnapshot()
    })

    test('renders vertical options correctly', () => {
      const { asFragment } = render(<Segmented {...props} optionsAlignment={Vertical} />)

      expect(screen.getByRole('list')).toBeVisible()

      stringOptions.forEach(name => {
        const option = screen.getByRole('listitem', { name })

        expect(option).toBeVisible()
        expect(option).toHaveAttribute('aria-disabled', 'false')
      })

      expect(screen.getByRole('listitem', { name: selectedOption })).toHaveAttribute('aria-checked', 'true')

      expect(asFragment()).toMatchSnapshot()
    })

    test('renders disabled segmented correctly', () => {
      const { asFragment } = render(<Segmented {...props} isDisabled />)

      expect(screen.getByRole('list')).toBeVisible()

      stringOptions.forEach(name => {
        const option = screen.getByRole('listitem', { name })

        expect(option).toBeVisible()
        expect(option).toHaveAttribute('aria-disabled', 'true')
      })

      expect(screen.getByRole('listitem', { name: selectedOption })).toHaveAttribute('aria-checked', 'true')

      expect(asFragment()).toMatchSnapshot()
    })

    test('select numeric default value correctly', () => {
      render(<Segmented {...props} defaultValue={2} />)

      expect(screen.getByRole('list')).toBeVisible()
      expect(screen.getByRole('listitem', { name: selectedOption })).toHaveAttribute('aria-checked', 'true')
    })

    test('select value correctly', () => {
      render(<Segmented {...props} value={controlledOption} />)

      expect(screen.getByRole('list')).toBeVisible()
      expect(screen.getByRole('listitem', { name: controlledOption })).toHaveAttribute('aria-checked', 'true')
    })

    test('select numeric value correctly', () => {
      render(<Segmented {...props} value={4} />)

      expect(screen.getByRole('list')).toBeVisible()
      expect(screen.getByRole('listitem', { name: controlledOption })).toHaveAttribute('aria-checked', 'true')
    })

    test('calls onChange correctly', () => {
      render(<Segmented {...props} />)

      fireEvent.click(screen.getByRole('listitem', { name: clickedOption }))

      expect(onChange).toBeCalledTimes(1)
      expect(onChange).toBeCalledWith(clickedOption)
    })
  })
})
