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
import { PiAcorn, PiNut, PiWarning } from 'react-icons/pi'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { action } from '@storybook/addon-actions'
import { debounce } from 'lodash-es'

import { DropdownClickEvent, DropdownProps } from './props'
import { Button } from '../Button'
import { Dropdown } from '.'
import { Icon } from '../Icon'
import { Placement } from './types'
import { Tag } from '../Tag'
import { Typography } from '../Typography'

const defaults: Partial<DropdownProps> = {
  items: [{
    icon: <Icon component={PiAcorn} size={16} />,
    id: 'id1',
    label: 'value 1',
  }, {
    id: 'id2',
    label: 'value 2',
    secondaryLabel: 'Some additional info 2',
  }, {
    icon: <Icon component={PiWarning} size={16} />,
    id: 'id3',
    label: 'I am danger!',
    danger: true,
    secondaryLabel: 'Some additional info 3',
  }, {
    id: 'id4-with-nested-items',
    label: 'Many Items here',
    secondaryLabel: 'just hover me',
    children: [{
      id: 'id4-c1',
      label: 'value 4.1',
    }, {
      id: 'id4-c2',
      label: 'value 4.2',
      children: [{
        id: 'id4-c2-c1',
        label: 'value 4.2-1',
      }],
    }],
  }, {
    id: 'id5-with-tag',
    label: 'with tag',
    secondaryLabel: 'Some additional info 2',
    tag: <Tag>{'Tag'}</Tag>,
  }, {
    id: 'id6-disabled',
    label: 'item disabled',
    disabled: true,
    secondaryLabel: 'Some additional info',
  }],
  children: <Button >{'click me'}</Button>,
  onClick: action('on click'),
  onOpenChange: action('on open change'),
  onSearch: undefined,
}

const meta = {
  component: Dropdown,
  args: defaults,
  argTypes: {
    children: { control: false },
  },
  render: (_, { args }) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Dropdown {...args} />
    </div>
  ),
} satisfies Meta<typeof Dropdown>

type Story = StoryObj<typeof meta>

export default meta

export const BasicExample: Story = {}

export const PlacementTop: Story = {
  args: {
    placement: Placement.Top,
  },
}

export const VerticalLayout: Story = {
  args: {
    itemLayout: Dropdown.ItemLayout.Vertical,
  },
}

export const HighlightSelection: Story = {
  args: {
    initialSelectedItems: ['id1'],
  },
}

export const MultipleHighlightSelection: Story = {
  args: {
    initialSelectedItems: [],
    multiple: true,
  },
}

export const MultipleHighlightSelectionWithVerticalLayout: Story = {
  args: {
    initialSelectedItems: [],
    itemLayout: Dropdown.ItemLayout.Vertical,
    multiple: true,
  },
}

export const HoverTrigger: Story = {
  args: {
    triggers: [Dropdown.Trigger.Hover],
  },
}

export const ContextMenuTrigger: Story = {
  args: {
    children: <span>{'right-click on me'}</span>,
    triggers: [Dropdown.Trigger.ContextMenu],
  },
}

export const WithCustomFooter: Story = {
  args: {
    footer: {
      top: <Typography.BodyM>{'Top description'}</Typography.BodyM>,
      bottom: <Typography.BodyM>{'Bottom description'}</Typography.BodyM>,
      actions: [{
        icon: <Icon component={PiAcorn} size={16} />,
        label: 'OK',
        onClick: action('footer button click'),
      }, {
        icon: <Icon component={PiNut} size={16} />,
        label: 'NOT OK',
        onClick: action('footer button 2 click'),
      }],
    },
  },
}

export const WithCustomFooterOverAndCustomMaxHeight: Story = {
  args: {
    menuItemsMaxHeight: 128,
    footer: {
      top: <Typography.BodyM>{'Top description'}</Typography.BodyM>,
      bottom: <Typography.BodyM>{'Bottom description'}</Typography.BodyM>,
      actions: [{
        icon: <Icon component={PiAcorn} size={16} />,
        label: 'OK',
        onClick: action('footer button click'),
      }, {
        icon: <Icon component={PiNut} size={16} />,
        label: 'NOT OK',
        onClick: action('footer button 2 click'),
      }],
    },
  },
}

export const WithCustomMaxHeight: Story = {
  args: {
    menuItemsMaxHeight: 128,
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
}

export const SelectionIsNotPersisted: Story = {
  args: {
    persistSelection: false,
  },
}

export const Searchable: Story = {
  args: {
    isSearchable: true,
  },
}

export const WithSearchAndFooter: Story = {
  args: {
    isSearchable: true,
    footer: {
      top: <Typography.BodyM>{'Top description'}</Typography.BodyM>,
      bottom: <Typography.BodyM>{'Bottom description'}</Typography.BodyM>,
      actions: [{
        icon: <Icon component={PiAcorn} size={16} />,
        label: 'OK',
        onClick: action('footer button click'),
      }, {
        icon: <Icon component={PiNut} size={16} />,
        label: 'NOT OK',
        onClick: action('footer button 2 click'),
      }],
    },
  },
}

export const SerchPerformedByExternalComponent: Story = {
  args: {
    items: [
      {
        id: 'conversation-1',
        label: 'Conversation #1',
      },
      {
        id: 'conversation-2',
        label: 'Conversation #2',
      },
      {
        id: 'conversation-3',
        label: 'Conversation #3',
      },
      {
        id: 'conversation-4',
        label: 'Conversation #4',
      },
      {
        id: 'conversation-5',
        label: 'Conversation #5',
      },
      {
        id: 'conversation-6',
        label: 'Cherry',
      },
      {
        id: 'conversation-7',
        label: 'Orange',
      },
      {
        id: 'conversation-7',
        label: 'Apple',
      },
      {
        id: 'conversation-9',
        label: 'Banana',
      },
    ],
    isSearchable: true,
  },
  // eslint-disable-next-line func-name-matching
  render: function Render(args: DropdownProps) {
    const [filteredItems, setFilteredItems] = useState(args.items)
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)

    const handleClick = useCallback((ev: DropdownClickEvent) => {
      action('onClick')(ev)
    }, [])

    const handleSearch = useCallback((search:string, isRetry = false) => {
      setIsLoading(true)
      setTimeout(() => {
        if (isRetry) {
          setHasError(false)
        } else if (search === 'err') {
          setHasError(true)
          setIsLoading(false)
          return
        }
        const res = args.items.filter(
          (item) => {
            return !search
              || (item
              && (item.label as string).toLowerCase().includes(search.toLowerCase()))
          }
        )
        setFilteredItems(res)
        setIsLoading(false)
      }, (1000))
      action('onSearch')(search)
    }, [args.items])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(debounce((value) => handleSearch(value), 500)
      , [handleSearch])

    useEffect(() => {
      return () => {
        debouncedSearch?.cancel()
      }
    }, [debouncedSearch])

    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Dropdown
          hasError={hasError}
          isLoading={isLoading}
          isSearchable
          items={filteredItems}
          searchPlaceholder={"Type 'err' for error state"}
          onClick={handleClick}
          onRetry={(search: string) => handleSearch(search, true)}
          onSearch={debouncedSearch}
        >
          <Button>{'Click me'}</Button>
        </Dropdown>
      </div>
    )
  },
}

