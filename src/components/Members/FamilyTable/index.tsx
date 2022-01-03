import { FC } from 'react'
import { Box, Text, Flex, FlexProps } from '@chakra-ui/react'

import CustomTable from 'components/CustomTable'
import { IMember } from 'interfaces/auth.interface'
import DropdownActions from '../DropdownActions'
import { familyStore } from 'stores/family.store'

const FamilyTable: FC<{ members: IMember[]; onOpen: () => void }> = ({
  members,
  onOpen
}) => {
  const actions = [
    {
      name: 'Father',
      action: ({ id, gender }) => {
        familyStore.setState({
          selectedData: { rel: 'Father', gender, mainId: id }
        })
        onOpen()
      }
    },
    {
      name: 'Mother',
      action: ({ id, gender }) => {
        familyStore.setState({
          selectedData: { rel: 'Mother', gender, mainId: id }
        })
        onOpen()
      }
    },
    {
      name: 'Spouses',
      action: ({ id, gender }) => {
        familyStore.setState({
          selectedData: { rel: 'Spouses', gender, mainId: id }
        })
        onOpen()
      }
    },
    {
      name: 'Son',
      action: ({ id, gender }) => {
        familyStore.setState({
          selectedData: { rel: 'Son', gender, mainId: id }
        })
        onOpen()
      }
    },
    {
      name: 'Daughter',
      action: ({ id, gender }) => {
        familyStore.setState({
          selectedData: { rel: 'Daughter', gender, mainId: id }
        })
        onOpen()
      }
    }
  ]

  const Header: FC<{ title: string; textAlign?: any }> = ({
    title,
    textAlign = 'center'
  }) => (
    <Box py={1} textAlign={textAlign} minW={28}>
      <Text as="span" textTransform="none" fontSize={{ xl: 'sm' }}>
        {title}
      </Text>
    </Box>
  )

  const Cell: FC<FlexProps> = ({ children, ...rest }) => (
    <Flex {...rest} noOfLines={2}>
      {children}
    </Flex>
  )

  const columns: {
    id: string
    Header: () => JSX.Element
    accessor: (e: IMember) => JSX.Element
  }[] = [
    {
      id: 'name',
      Header: () => <Header title="Name" textAlign="left" />,
      accessor: ({ first_name, last_name }) => (
        <Cell>
          <Text>{first_name + ' ' + last_name}</Text>
        </Cell>
      )
    },
    {
      id: 'gender',
      Header: () => <Header title="Gender" />,
      accessor: ({ gender }) => (
        <Cell align="center" justify="center">
          <Text textTransform="capitalize">{gender}</Text>
        </Cell>
      )
    },
    {
      id: 'phone_number',
      Header: () => <Header title="Phone number" />,
      accessor: ({ phonenumber }) => (
        <Cell justify="center">
          <Text>{phonenumber}</Text>
        </Cell>
      )
    },
    {
      id: 'religion',
      Header: () => <Header title="Religion" />,
      accessor: ({ religion }) => (
        <Cell align="center" justify="center">
          <Text>{religion}</Text>
        </Cell>
      )
    },
    {
      id: 'occupation',
      Header: () => <Header title="Occupation" />,
      accessor: ({ occupation }) => (
        <Cell align="center" justify="center">
          <Text>{occupation}</Text>
        </Cell>
      )
    },
    {
      id: 'add-relation',
      Header: () => <Header title="Add Relation" />,
      accessor: data => <DropdownActions data={data} options={actions} />
    }
  ]

  return (
    <Box py={10} px={6} w="full" bgColor="white">
      <CustomTable
        data={members}
        variant="stripe"
        columns={columns}
        rowStyle={{ cursor: 'pointer', bgColor: 'grey.200' }}
      />
    </Box>
  )
}

export default FamilyTable
