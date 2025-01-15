import { Meta, StoryObj } from '@storybook/react'

import { AuditLogTableWithFilters } from '.'

const meta = {
  component: AuditLogTableWithFilters,
} satisfies Meta<typeof AuditLogTableWithFilters>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
