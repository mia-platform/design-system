import { ReactNode } from 'react'
import { Space } from 'antd'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

export type FilterConfirmProps = {
  closeDropdown: boolean;
}

export type SearchDropdownProps = {
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  selectedKeys: React.Key[];
  confirm: (param?: FilterConfirmProps) => void;
  clearFilters?: () => void;
  close: () => void;
}

export const SearchDropdown = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
  close,
}: SearchDropdownProps) : ReactNode => {
  return (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={'Search'}
        value={selectedKeys[0] as string}
        onChange={(event) =>
          setSelectedKeys(event?.target.value ? [event.target.value] : [])}
        // onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
      />
      <Space>
        <Button
          // onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          onClick={() => {
            confirm({ closeDropdown: true })
          }}
        >
            Search
        </Button>
        <Button
          hierarchy={Button.Hierarchy.Neutral}
          onClick={() => {
            if (clearFilters) {
              clearFilters()
            }
          }}
        >
            Reset
        </Button>
        <Button
          type={Button.Type.Link}
          onClick={() => {
            close()
          }}
        >
            close
        </Button>
      </Space>
    </div>
  )
}

