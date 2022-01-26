import { FC } from 'react'
import { Box, Text, Flex, FlexProps, BoxProps } from '@chakra-ui/react'

import CustomTable from 'components/CustomTable'
import { IMember } from 'interfaces/auth.interface'
import DropdownActions from '../DropdownActions'
import { familyStore } from 'stores/family.store'
import { getAge } from 'utils/helper'
import { FiEdit, FiDelete } from 'react-icons/fi'

const FamilyTable: FC<{ members: IMember[]; onOpen: () => void }> = ({
  members,
  onOpen
}) => {
  const { deleteFamilyMember } = familyStore(s => s)

  const actions = [
    {
      name: 'Edit',
      icon: FiEdit,
      action: row => {
        familyStore.setState({ selectedMember: row, modal: 'edit' })
        onOpen()
      }
    },
    {
      name: 'Delete',
      icon: FiDelete,
      action: async ({ id }) => {
        if (confirm('Are you sure you want to delete this member?')) {
          // TODO: delete
          await deleteFamilyMember(id)
        }
      }
    }
  ]

  const addRelationActions = [
    {
      name: 'Father',
      action: ({ id, gender }) => {
        familyStore.setState({
          modal: 'prompt',
          selectedData: { rel: 'Father', gender, mainId: id }
        })
        onOpen()
      }
    },
    {
      name: 'Mother',
      action: ({ id, gender }) => {
        familyStore.setState({
          modal: 'prompt',
          selectedData: { rel: 'Mother', gender, mainId: id }
        })
        onOpen()
      }
    },
    {
      name: 'Spouses',
      action: ({ id, gender }) => {
        familyStore.setState({
          modal: 'prompt',
          selectedData: { rel: 'Spouses', gender, mainId: id }
        })
        onOpen()
      }
    },
    {
      name: 'Son',
      action: ({ id, gender }) => {
        familyStore.setState({
          modal: 'prompt',
          selectedData: { rel: 'Son', gender, mainId: id }
        })
        onOpen()
      }
    },
    {
      name: 'Daughter',
      action: ({ id, gender }) => {
        familyStore.setState({
          modal: 'prompt',
          selectedData: { rel: 'Daughter', gender, mainId: id }
        })
        onOpen()
      }
    }
  ]

  const Header: FC<{ title: string } & BoxProps> = ({ title, ...rest }) => (
    <Box py={1} {...rest}>
      <Text as="span" textTransform="none" fontSize={{ xl: 'sm' }}>
        {title}
      </Text>
    </Box>
  )

  const Cell: FC<FlexProps> = ({ children, ...rest }) => (
    <Flex {...rest}>{children}</Flex>
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
        <Cell>
          <Text textTransform="capitalize">{gender}</Text>
        </Cell>
      )
    },
    {
      id: 'date_of_birth',
      Header: () => <Header title="Birthday" />,
      accessor: ({ date_of_birth }) => (
        <Cell>
          <Text>{date_of_birth}</Text>
        </Cell>
      )
    },
    {
      id: 'age',
      Header: () => <Header title="Age" />,
      accessor: ({ date_of_birth }) => (
        <Cell>
          <Text>~{getAge(date_of_birth || '')}</Text>
        </Cell>
      )
    },
    {
      id: 'add-relation',
      Header: () => <Header title="Add Relation" />,
      accessor: data => (
        <DropdownActions
          data={data}
          title="Select..."
          options={addRelationActions}
        />
      )
    },
    {
      id: 'actions',
      Header: () => <Header title="Actions" />,
      accessor: data => (
        <DropdownActions data={data} title="Select..." options={actions} />
      )
    }
  ]

  return (
    <Box
      py={10}
      w="full"
      h="full"
      rounded="md"
      borderWidth={1}
      bgColor="white"
      overflow="scroll"
      borderColor="gray.300"
    >
      <CustomTable
        data={members}
        columns={columns}
        rowStyle={{ cursor: 'pointer', bgColor: 'grey.200' }}
      />
    </Box>
  )
}

export default FamilyTable
