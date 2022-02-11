import { FC, useEffect } from 'react'
import { useFormik } from 'formik'
import isEmpty from 'lodash/isEmpty'
import { FiEdit2 } from 'react-icons/fi'
import { Box, Icon, Grid, Flex, GridItem } from '@chakra-ui/react'
import { useQuery, useQueryClient } from 'react-query'

import { FilledButton } from 'components/Buttons'
import { FileUpload, Input, Select } from 'components/Forms'
import Thumb from 'components/Thumb'

import { familyStore } from 'stores/family.store'

import { IMember } from 'interfaces/auth.interface'

import Avatar from 'assets/images/avatar.png'
import useAlertListener from 'hooks/useAlertListener'
import Wrapper from 'container/Layout'
import { getFamilyMembers } from 'utils/api/services'
import CountryList from 'country-json/src/country-by-name.json'
const Members: FC = () => {
  document.title = 'Add Member | Family Line'

  const { data } = useQuery('family-members', () => getFamilyMembers())

  const { error, message, isLoading, selectedData, addFamilyMember } =
    familyStore(state => state)

  const queryClient = useQueryClient()

  useEffect(() => {
    if (message) {
      queryClient.invalidateQueries('family-members')
    }
  }, [message])

  useAlertListener(familyStore, {
    message: error || message,
    type: error ? 'error' : 'success'
  })

  const formik = useFormik<Partial<IMember>>({
    enableReinitialize: true,
    initialValues: {
      race: '',
      tribe: '',
      gender: selectedData?.rel
        ? ['Son', 'Father'].includes(selectedData.rel)
          ? 'Male'
          : 'Female'
        : '',
      address: '',
      country: '',
      father:
        ['Male', 'male'].includes(selectedData?.gender || '') &&
        ['Son', 'Daughter'].includes(selectedData?.rel || '')
          ? selectedData?.mainId
          : '',
      mother:
        ['Female', 'female'].includes(selectedData?.gender || '') &&
        ['Son', 'Daughter'].includes(selectedData?.rel || '')
          ? selectedData?.mainId
          : '',
      spouses: selectedData?.rel === 'Spouses' ? [selectedData?.mainId] : [],
      children: selectedData?.rel
        ? ['Father', 'Mother'].includes(selectedData?.rel)
          ? [selectedData?.mainId]
          : []
        : [],
      religion: '',
      last_name: '',
      first_name: '',
      occupation: '',
      phonenumber: '',
      date_of_birth: '',
      avatar: undefined
    },
    onSubmit: async values => {
      const fd = new FormData()
      Object.entries(values).forEach((d: any[]) => {
        const dd = '' + d[1]

        if (!isEmpty(dd)) {
          if (['spouses', 'children'].includes(d[0])) {
            fd.append(d[0], JSON.stringify(d[1]))
          } else {
            fd.append(d[0], d[1])
          }
        }
      })
      fd.append('main', '' + (data?.length === 0))
      await addFamilyMember(fd)
    }
  })

  return (
    <Wrapper>
      <Box my={{ xl: 10 }} width={{ xl: '80%' }}>
        <form onSubmit={formik.handleSubmit}>
          <Flex
            w="full"
            pos="relative"
            align="center"
            mb={{ lg: 10 }}
            flexDir="column"
          >
            <Box pos="relative" w={32} h={32}>
              <Thumb
                w={32}
                h={32}
                top={0}
                left={0}
                pos="absolute"
                src={`${Avatar}`}
                alt={formik.values.first_name + ' ' + formik.values.last_name}
                imageFile={formik.values.avatar}
              />
              <FileUpload
                w={32}
                h={32}
                top={0}
                left={0}
                id="avatar"
                zIndex={40}
                opacity={0}
                pos="absolute"
                cursor="pointer"
                setFieldValue={formik.setFieldValue}
              />

              <Flex
                top={2}
                right={2}
                opacity={0.8}
                pos="absolute"
                justify="center"
              >
                <Icon as={FiEdit2} boxSize={8} color="brand.green.200" />
              </Flex>
            </Box>
          </Flex>
          <Grid gap={10} templateColumns={{ xl: 'repeat(2, 1fr)' }}>
            <GridItem
              as={Input}
              required
              type="text"
              id="first_name"
              label="First Name"
              onBlur={formik.handleBlur}
              placeholder="Enter first name"
              onChange={formik.handleChange}
              value={formik.values.first_name}
              error={formik.errors.first_name}
              touched={formik.touched.first_name}
              setFieldTouched={formik.setFieldTouched}
            />

            <GridItem
              as={Input}
              required
              type="text"
              id="last_name"
              label="Last Name"
              onBlur={formik.handleBlur}
              placeholder="Enter last name"
              onChange={formik.handleChange}
              value={formik.values.last_name}
              error={formik.errors.last_name}
              touched={formik.touched.last_name}
              setFieldTouched={formik.setFieldTouched}
            />

            <GridItem
              as={Input}
              required
              type="text"
              id="gender"
              label="Gender"
              placeholder="Type gender e.g Male"
              value={formik.values.gender}
              error={formik.errors.gender}
              touched={formik.touched.gender}
              onChange={formik.handleChange}
              setFieldTouched={formik.setFieldTouched}
            />

            <GridItem
              as={Input}
              id="address"
              type="text"
              label="Address"
              placeholder="Enter address"
              onBlur={formik.handleBlur}
              value={formik.values.address}
              error={formik.errors.address}
              onChange={formik.handleChange}
              touched={formik.touched.address}
              setFieldTouched={formik.setFieldTouched}
            />

            <GridItem
              as={Input}
              type="text"
              id="occupation"
              label="Occupation"
              onBlur={formik.handleBlur}
              placeholder="Enter occupation"
              onChange={formik.handleChange}
              value={formik.values.occupation}
              error={formik.errors.occupation}
              touched={formik.touched.occupation}
              setFieldTouched={formik.setFieldTouched}
            />

            <GridItem
              as={Input}
              required
              type="date"
              id="date_of_birth"
              label="Date Of Birth"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.date_of_birth}
              error={formik.errors.date_of_birth}
              touched={formik.touched.date_of_birth}
              setFieldTouched={formik.setFieldTouched}
            />

            <GridItem
              as={Select}
              id="race"
              label="Race"
              placeholder="Choose race"
              value={formik.values.race}
              error={formik.errors.race}
              touched={formik.touched.race}
              setFieldValue={formik.setFieldValue}
              setFieldTouched={formik.setFieldTouched}
              options={['African American/Black', 'White', 'Hispanic']}
            />

            <GridItem
              id="tribe"
              as={Select}
              label="Ethnicity/Tribe"
              placeholder="Choose ethnicity or tribe"
              value={formik.values.tribe}
              error={formik.errors.tribe}
              touched={formik.touched.tribe}
              setFieldValue={formik.setFieldValue}
              setFieldTouched={formik.setFieldTouched}
              options={['Twi', 'Ga', 'Hausa', 'Igbo', 'Yoruba']}
            />

            <GridItem
              as={Select}
              id="country"
              label="Country"
              placeholder="Choose country"
              value={formik.values.country}
              error={formik.errors.country}
              touched={formik.touched.country}
              setFieldValue={formik.setFieldValue}
              options={CountryList.map(item => item.country)}
              setFieldTouched={formik.setFieldTouched}
            />

            <GridItem
              as={Input}
              id="religion"
              label="Religion"
              placeholder="Type religion"
              value={formik.values.religion}
              error={formik.errors.religion}
              touched={formik.touched.religion}
              onChange={formik.handleChange}
              setFieldTouched={formik.setFieldTouched}
            />
          </Grid>
          <Flex mt={16} w="full" justify="center">
            <FilledButton
              w={44}
              type="submit"
              title="Submit"
              isLoading={isLoading}
              isDisabled={isLoading || !(formik.dirty && formik.isValid)}
            />
          </Flex>
        </form>
      </Box>
    </Wrapper>
  )
}

export default Members
