import { FC, useEffect } from 'react'
import { useFormik } from 'formik'
import { FiEdit2 } from 'react-icons/fi'
import { Box, Icon, Grid, Flex, GridItem } from '@chakra-ui/react'
import { useQueryClient } from 'react-query'

import { FilledButton } from 'components/Buttons'
import { FileUpload, Input, Select } from 'components/Forms'
import Thumb from 'components/Thumb'

import { familyStore } from 'stores/member.store'

import { IMembers } from 'interfaces/auth.interface'
import { Views } from 'pages/tree'

import Avatar from 'assets/images/avatar.png'
import useAlertListener from 'hooks/useAlertListener'

const AddMemberForm: FC<{ isAdd?: boolean; toggle?: (e: Views) => void }> = ({
  isAdd,
  toggle
}) => {
  const { error, message, isLoading, addFamilyMembers } = familyStore(
    state => state
  )

  useAlertListener(familyStore, {
    message: error || message,
    type: error ? 'error' : 'success'
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    if (message) {
      queryClient.invalidateQueries()
    }
  }, [message])

  const formik = useFormik<Partial<IMembers>>({
    initialValues: {
      race: undefined,
      tribe: undefined,
      gender: undefined,
      father: undefined,
      mother: undefined,
      address: undefined,
      main: true,
      country: undefined,
      spouses: [],
      children: [],
      religion: undefined,
      last_name: undefined,
      occupation: undefined,
      first_name: undefined,
      phonenumber: undefined,
      date_of_birth: undefined,
      avatar: undefined
    },
    onSubmit: async values => {
      const fd = new FormData()
      Object.entries(values).forEach((d: any[]) => {
        fd.append(d[0], d[1])
      })
      await addFamilyMembers(fd)
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex
        w="full"
        pos="relative"
        flexDir="column"
        align="center"
        mb={{ lg: 10 }}
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

          <Flex top={2} right={2} opacity={0.8} pos="absolute" justify="center">
            <Icon as={FiEdit2} boxSize={8} color="brand.green.200" />
          </Flex>
        </Box>
      </Flex>
      <Grid rowGap={10} columnGap={10} templateColumns={{ xl: '50% 50%' }}>
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
        {/* 
        <GridItem
          as={Select}
          id="spouses"
          label="Spouses"
          placeholder="Add a spouses"
          value={formik.values.spouses}
          error={formik.errors.spouses}
          touched={formik.touched.spouses}
          onChange={formik.handleChange}
          options={['Father', 'Mother']}
          setFieldValue={formik.setFieldValue}
          setFieldTouched={formik.setFieldTouched}
        />

        <GridItem
          as={Select}
          id="children"
          label="Children"
          placeholder="Add a children"
          value={formik.values.children}
          error={formik.errors.children}
          touched={formik.touched.children}
          onChange={formik.handleChange}
          options={['Father', 'Mother']}
          setFieldValue={formik.setFieldValue}
          setFieldTouched={formik.setFieldTouched}
        />

        <GridItem
          as={Select}
          id="mother"
          label="Mother"
          placeholder="Add a mother"
          value={formik.values.mother}
          error={formik.errors.mother}
          onChange={formik.handleChange}
          touched={formik.touched.mother}
          options={['Father', 'Mother']}
          setFieldValue={formik.setFieldValue}
          setFieldTouched={formik.setFieldTouched}
        />

        <GridItem
          as={Select}
          id="father"
          label="Father"
          placeholder="Add a father"
          value={formik.values.father}
          error={formik.errors.father}
          touched={formik.touched.father}
          onChange={formik.handleChange}
          options={['Father', 'Mother']}
          setFieldValue={formik.setFieldValue}
          setFieldTouched={formik.setFieldTouched}
        /> */}

        <GridItem
          as={Select}
          required
          id="gender"
          label="Gender"
          placeholder="Choose gender"
          value={formik.values.gender}
          error={formik.errors.gender}
          touched={formik.touched.gender}
          onChange={formik.handleChange}
          setFieldValue={formik.setFieldValue}
          options={['Male', 'Female', 'Others']}
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
          onChange={formik.handleChange}
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
          onChange={formik.handleChange}
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
          onChange={formik.handleChange}
          setFieldValue={formik.setFieldValue}
          options={['Ghana', 'Nigeria', 'Togo']}
          setFieldTouched={formik.setFieldTouched}
        />

        <GridItem
          as={Select}
          id="religion"
          label="Religion"
          placeholder="Choose religion"
          value={formik.values.religion}
          error={formik.errors.religion}
          onChange={formik.handleChange}
          touched={formik.touched.religion}
          setFieldValue={formik.setFieldValue}
          setFieldTouched={formik.setFieldTouched}
          options={['Christianity', 'Islam', 'Others']}
        />
      </Grid>
      <Flex mt={16} w="full" justify="center">
        {isAdd ? (
          <>
            <FilledButton
              w={44}
              type="submit"
              title="Submit"
              isLoading={isLoading}
              isDisabled={isLoading || !(formik.dirty && formik.isValid)}
            />
            <Box mx={2} />
            {toggle && (
              <FilledButton
                w={44}
                title="View Tree"
                onClick={() => toggle('chart')}
              />
            )}
          </>
        ) : (
          <FilledButton
            w={44}
            type="submit"
            title="Update"
            isLoading={isLoading}
            isDisabled={isLoading || !(formik.dirty && formik.isValid)}
          />
        )}
      </Flex>
    </form>
  )
}

export default AddMemberForm
