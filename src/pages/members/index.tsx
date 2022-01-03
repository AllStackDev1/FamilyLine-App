import { FC, useEffect } from 'react'
import { useQuery } from 'react-query'
import { Box, Flex, useDisclosure } from '@chakra-ui/react'

import Wrapper from 'container/Layout'
import { FamilyTree, FamilyTable, AddMemberForm } from 'components/Members'

import { getFamilyMembers } from 'utils/api/services'
import { generateTreeData } from 'utils/helper'
import { familyStore } from 'stores/family.store'
import { FilledButton } from 'components/Buttons'

const Members: FC = () => {
  document.title = 'Family Line | Members'

  const { view } = familyStore(s => s)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { data } = useQuery('family-members', () => getFamilyMembers(), {
    refetchOnWindowFocus: false,
    staleTime: 300000
  })

  useEffect(() => {
    if (data?.length === 0) {
      onOpen()
    }
  }, [data?.length])

  return (
    <Wrapper>
      <Box my={{ xl: 10 }} width={{ xl: '80%' }}>
        <AddMemberForm
          isOpen={isOpen}
          onClose={onClose}
          isMain={data?.length === 0}
        />
        {data && (
          <>
            {view === 'tree' ? (
              <FamilyTree data={generateTreeData(data)} />
            ) : (
              <FamilyTable members={data} onOpen={onOpen} />
            )}
          </>
        )}

        <Flex mt={5} w="full" justify="flex-end">
          <FilledButton
            px={5}
            title={`Switch To ${view === 'tree' ? 'Table' : 'Tree'} View`}
            onClick={() =>
              familyStore.setState({ view: view === 'tree' ? 'table' : 'tree' })
            }
          />
        </Flex>
      </Box>
    </Wrapper>
  )
}

export default Members
