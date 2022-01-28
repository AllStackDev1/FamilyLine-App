import { FC, useEffect } from 'react'
import { useQuery } from 'react-query'
import { Box, Flex, useDisclosure } from '@chakra-ui/react'

import Wrapper from 'container/Layout'
import { FamilyTree, FamilyTable, AddRelationPrompt } from 'components/Members'

import { getFamilyMembers } from 'utils/api/services'
import { familyStore } from 'stores/family.store'
import { FilledButton } from 'components/Buttons'
import { useNavigate } from 'react-router-dom'
import upperFirst from 'lodash/upperFirst'
import { BsFillEyeFill } from 'react-icons/bs'

const Members: FC = () => {
  const navigate = useNavigate()

  const { view } = familyStore(s => s)
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { data } = useQuery('family-members', () => getFamilyMembers(), {
    refetchOnWindowFocus: false,
    staleTime: 300000
  })

  const title = (text: string) => {
    return [upperFirst(view), text].join(' ')
  }

  document.title = `${title(
    view === 'tree' ? 'Diagram' : 'List'
  )} | Family Line`

  useEffect(() => {
    if (data?.length === 0) {
      navigate('/members/add')
    }
  }, [data?.length])

  return (
    <Wrapper>
      <Box my={{ xl: 10 }} width={{ xl: '80%' }}>
        <AddRelationPrompt
          isOpen={isOpen}
          onClose={onClose}
          onCreateNew={() => navigate('/members/add')}
        />

        <Flex mb={5} w="full" justify="flex-end">
          <FilledButton
            px={5}
            leftIcon={<BsFillEyeFill size={20} />}
            title={view === 'tree' ? 'Table List' : 'Tree Diagram'}
            onClick={() =>
              familyStore.setState({ view: view === 'tree' ? 'table' : 'tree' })
            }
          />
        </Flex>

        {data && (
          <>
            {view === 'tree' ? (
              <FamilyTree data={data} />
            ) : (
              <FamilyTable members={data} onOpen={onOpen} />
            )}
          </>
        )}
      </Box>
    </Wrapper>
  )
}

export default Members
