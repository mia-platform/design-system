import { render, screen } from '@testing-library/react'

import { labeledOptions, stringOptions } from './Segmented.mocks'
import { OptionsAlignments } from './Segmented.types'
import { Segmented } from '.'

const { Vertical } = OptionsAlignments

describe('Segmented Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('labeled options', () => {
    const [,, selectedOption, , controlledOption] = labeledOptions

    const props = {
      defaultValue: selectedOption.key,
      options: labeledOptions,
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
  })

  describe('string options', () => {
    const [,, selectedOption, , controlledOption] = stringOptions

    const props = {
      defaultValue: selectedOption,
      options: stringOptions,
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
  })
})
