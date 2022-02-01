import { useQuery, useQueryClient } from 'react-query'
import { FC, useState, useEffect } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { useFormik } from 'formik'

import Modal from 'components/Modal'
import { OutlinedButton, FilledButton } from 'components/Buttons'
import { familyStore } from 'stores/family.store'
import useAlertListener from 'hooks/useAlertListener'
import { getFamilyMembers } from 'utils/api/services'

import { Select } from 'components/Forms'

type rel = 'father' | 'mother' | 'spouses' | 'son' | 'daughter'

const AddRelationPrompt: FC<{
  isOpen: boolean
  onClose: () => void
  onCreateNew: () => void
}> = ({ isOpen, onClose, onCreateNew }) => {
  const [isSelect, setOnSelect] = useState(false)
  const { error, message, isLoading, selectedData, updateFamilyMember } =
    familyStore(state => state)

  const { data } = useQuery('family-members', () => getFamilyMembers())

  const queryClient = useQueryClient()

  useEffect(() => {
    if (message) {
      setOnSelect(false)
      formik.setFieldValue('idToAdd', '')
      queryClient.invalidateQueries()
      onClose()
    }
  }, [message])

  useAlertListener(familyStore, {
    message: error || message,
    type: error ? 'error' : 'success'
  })

  const formik = useFormik({
    initialValues: { idToAdd: '' },
    onSubmit: async values => {
      const rel = selectedData?.rel.toLowerCase() as rel

      if (rel === 'father' || rel === 'mother') {
        console.log("rel === 'father' || rel === 'mother'")
        const fd1 = new FormData()
        fd1.append(rel, values.idToAdd)
        await updateFamilyMember(selectedData?.mainId as string, fd1)

        // find parent
        const parent = data?.find(e => e.id === values.idToAdd)
        const fd2 = new FormData()
        fd2.append(
          'children',
          JSON.stringify([
            ...(parent?.children || []),
            selectedData?.mainId as string
          ])
        )
        await updateFamilyMember(values.idToAdd as string, fd2)
      }

      if (rel === 'spouses') {
        // find spouse
        const spouse1 = data?.find(e => e.id === selectedData?.mainId)
        const fd1 = new FormData()
        fd1.append(
          rel,
          JSON.stringify([...(spouse1?.spouses || []), values.idToAdd])
        )
        await updateFamilyMember(selectedData?.mainId as string, fd1)

        const spouse2 = data?.find(e => e.id === values.idToAdd)
        const fd2 = new FormData()
        fd2.append(
          rel,
          JSON.stringify([
            ...(spouse2?.spouses || []),
            selectedData?.mainId as string
          ])
        )
        await updateFamilyMember(values.idToAdd, fd2)
      }

      if (rel === 'son' || rel === 'daughter') {
        // find parent
        const parent = data?.find(
          e => e.id === (selectedData?.mainId as string)
        )
        const fd1 = new FormData()
        fd1.append(
          'children',
          JSON.stringify([...(parent?.children || []), values.idToAdd])
        )
        await updateFamilyMember(selectedData?.mainId as string, fd1)

        const fd2 = new FormData()
        fd2.append(
          ['Male', 'male'].includes(parent?.gender as string)
            ? 'father'
            : 'mother',
          selectedData?.mainId as string
        )
        await updateFamilyMember(values.idToAdd, fd2)
      }
    }
  })

  const _value = data?.find(e => e.id === formik.values.idToAdd)

  const confirmAddition = () => {
    if (['Mother', 'Father'].includes(selectedData?.rel as string)) {
      const member = data?.find(e => e.id === selectedData?.mainId)
      if (member?.father || member?.mother) {
        return true
      }
    }
    return false
  }

  return (
    <Modal
      title=""
      size="xl"
      isOpen={isOpen}
      onClose={() => {
        onClose()
        setOnSelect(false)
        formik.setFieldValue('idToAdd', '')
      }}
    >
      <Flex
        align="center"
        flexDir="column"
        textAlign="center"
        py={{ base: 10 }}
        px={{ base: 8 }}
      >
        {isSelect ? (
          <Box w="full">
            <form onSubmit={formik.handleSubmit}>
              <Select
                required
                id="idToAdd"
                value={
                  (_value?.first_name || '') + ' ' + (_value?.last_name || '')
                }
                error={formik.errors.idToAdd}
                touched={formik.touched.idToAdd}
                label={selectedData?.rel as string}
                setFieldValue={(id, value) => {
                  formik.setFieldValue(id, value.id)
                }}
                setFieldTouched={formik.setFieldTouched}
                options={
                  data
                    ?.filter(
                      e =>
                        e.gender?.toLowerCase() ===
                        (['Son', 'Father'].includes(selectedData?.rel as string)
                          ? 'male'
                          : 'female')
                    )
                    ?.map(e => ({
                      id: e.id,
                      name: e.first_name + ' ' + e.last_name
                    }))
                    .filter(e => e.id !== selectedData?.mainId) || []
                }
                placeholder={`Choose ${selectedData?.rel as string}"`}
              />

              <Box mt={4}>
                <FilledButton
                  py={6}
                  w="40%"
                  type="submit"
                  fontSize="sm"
                  title="Submit"
                  isLoading={isLoading}
                  colorScheme="primaryScheme"
                  isDisabled={isLoading && !formik.values.idToAdd}
                />
              </Box>
            </form>
          </Box>
        ) : (
          <>
            <Text mt={4} lineHeight="23px">
              Do you want to select from list of members or add a new member?
            </Text>
            <Flex mt={6} w="full" justify="space-between">
              <OutlinedButton
                py={6}
                w="30%"
                fontSize="sm"
                title="Select"
                colorScheme="primaryScheme"
                onClick={() => setOnSelect(true)}
              />
              <FilledButton
                py={6}
                w="30%"
                fontSize="sm"
                title="Create"
                isDisabled={confirmAddition()}
                onClick={onCreateNew}
                colorScheme="primaryScheme"
              />
            </Flex>
          </>
        )}
      </Flex>
    </Modal>
  )
}

export default AddRelationPrompt
