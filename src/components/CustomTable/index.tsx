/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import { Tr, Th, Td, Table, Thead, Tbody, StyleProps } from '@chakra-ui/react'
import { useTable } from 'react-table'

interface ICustomTable {
  columns: any[]
  data: any[]
  variant?: string
  extraRow?: JSX.Element
  rowStyle?: StyleProps
  headerStyle?: StyleProps
  handleRowClick?: (e: any) => void
}

const CustomTable: React.FC<ICustomTable & { children?: React.ReactNode }> = ({
  data,
  variant,
  columns,
  children,
  extraRow,
  rowStyle,
  headerStyle,
  handleRowClick
}): JSX.Element => {
  const _data = React.useMemo(() => data, [data])
  const _columns = React.useMemo(() => columns, [columns])

  const tableInstance = useTable({ columns: _columns, data: _data })

  const { rows, prepareRow, headerGroups, getTableProps, getTableBodyProps } =
    tableInstance

  return (
    <Table variant={variant} {...getTableProps()}>
      <Thead>
        {headerGroups.map(headerGroup => (
          <Tr {...headerGroup.getHeaderGroupProps()} {...headerStyle}>
            {headerGroup.headers.map(column => (
              <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row: any) => {
          prepareRow(row)
          return (
            <Tr
              {...row.getRowProps()}
              onClick={() => (handleRowClick ? handleRowClick(row) : null)}
              {...rowStyle}
            >
              {row.cells.map((cell: any) => {
                return (
                  <Td fontSize="sm" {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </Td>
                )
              })}
            </Tr>
          )
        })}
        {extraRow}
        {children && (
          <Tr>
            <Td color="gray.400" textAlign="center" colSpan={columns.length}>
              {children}
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  )
}

export default CustomTable
