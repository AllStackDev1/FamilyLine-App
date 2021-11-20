import { FC } from 'react'
import { useFormik } from 'formik'
import { Box, Icon, Grid, Flex, GridItem } from '@chakra-ui/react'
import { FilledButton } from 'Components/Buttons'
import { FileUpload, Input, Select } from 'Components/Forms'
import { Views } from 'Views/MyFamily'
import useAuth from 'Utils/Providers/AuthContextProvider'

import { IUser } from 'Interfaces/auth.interface'
import Thumb from 'Components/Thumb'
import { authStore } from 'Stores/auth.store'

import Avatar from 'Assets/Images/avatar.png'
import { FiEdit2 } from 'react-icons/fi'

const AddMemberForm: FC<{ isAdd?: boolean; toggle?: (e: Views) => void }> = ({
  isAdd,
  toggle
}) => {
  const { isLoading, login } = useAuth()

  const user = authStore(state => state.user)

  interface IForm extends Partial<IUser> {
    relationship: string
  }

  const formik = useFormik<IForm>({
    initialValues: {
      avatar: undefined,
      firstName: '',
      lastName: '',
      password: '',
      gender: '',
      address: '',
      occupation: '',
      relationship: '',
      dob: '',
      race: '',
      country: '',
      tribe: '',
      religion: ''
    },
    onSubmit: async values => {
      await login(values)
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
            src={isAdd ? `${Avatar}` : user?.avatar}
            alt={formik.values.firstName + ' ' + formik.values.lastName}
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
          id="firstName"
          label="First Name"
          onBlur={formik.handleBlur}
          placeholder="Enter first name"
          value={formik.values.firstName}
          error={formik.errors.firstName}
          touched={formik.touched.firstName}
          onChange={formik.handleChange}
          setFieldTouched={formik.setFieldTouched}
        />

        <GridItem
          as={Input}
          required
          type="text"
          id="lastName"
          label="Last Name"
          onBlur={formik.handleBlur}
          placeholder="Enter last name"
          value={formik.values.lastName}
          error={formik.errors.lastName}
          touched={formik.touched.lastName}
          onChange={formik.handleChange}
          setFieldTouched={formik.setFieldTouched}
        />

        {isAdd && (
          <GridItem
            as={Select}
            required
            id="relationship"
            label="Relationship"
            placeholder="Choose relationship"
            value={formik.values.relationship}
            error={formik.errors.relationship}
            touched={formik.touched.relationship}
            onChange={formik.handleChange}
            options={[
              'Father',
              'Mother',
              'Brother',
              'Sister',
              'Son',
              'Daughter',
              'Uncle',
              'Aunty',
              'Grand Father',
              'Grand Mother'
            ]}
            setFieldTouched={formik.setFieldTouched}
            setFieldValue={formik.setFieldValue}
          />
        )}

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
          options={['Male', 'Female', 'Others']}
          setFieldTouched={formik.setFieldTouched}
          setFieldValue={formik.setFieldValue}
        />

        <GridItem
          as={Input}
          required
          id="address"
          type="text"
          label="Address"
          placeholder="Enter address"
          onBlur={formik.handleBlur}
          value={formik.values.address}
          error={formik.errors.address}
          touched={formik.touched.address}
          onChange={formik.handleChange}
          setFieldTouched={formik.setFieldTouched}
        />

        <GridItem
          as={Input}
          required
          type="text"
          id="occupation"
          label="Occupation"
          placeholder="Enter occupation"
          onBlur={formik.handleBlur}
          value={formik.values.occupation}
          error={formik.errors.occupation}
          touched={formik.touched.occupation}
          onChange={formik.handleChange}
          setFieldTouched={formik.setFieldTouched}
        />

        <GridItem
          as={Input}
          required
          type="date"
          id="dob"
          label="Date Of Birth"
          onBlur={formik.handleBlur}
          value={formik.values.dob}
          error={formik.errors.dob}
          touched={formik.touched.dob}
          onChange={formik.handleChange}
          setFieldTouched={formik.setFieldTouched}
        />

        <GridItem
          as={Select}
          required
          id="race"
          label="Race"
          placeholder="Choose race"
          value={formik.values.race}
          error={formik.errors.race}
          touched={formik.touched.race}
          onChange={formik.handleChange}
          options={['Hausa', 'Igbo', 'Yoruba']}
          setFieldTouched={formik.setFieldTouched}
          setFieldValue={formik.setFieldValue}
        />

        <GridItem
          as={Select}
          required
          id="tribe"
          label="Ethnicity/Tribe"
          placeholder="Choose ethnicity or tribe"
          value={formik.values.tribe}
          error={formik.errors.tribe}
          touched={formik.touched.tribe}
          onChange={formik.handleChange}
          options={['Hausa', 'Igbo', 'Yoruba']}
          setFieldTouched={formik.setFieldTouched}
          setFieldValue={formik.setFieldValue}
        />

        <GridItem
          as={Select}
          required
          id="country"
          label="Country"
          placeholder="Choose country"
          value={formik.values.country}
          error={formik.errors.country}
          touched={formik.touched.country}
          onChange={formik.handleChange}
          options={['Hausa', 'IGbo', 'Yoruba']}
          setFieldTouched={formik.setFieldTouched}
          setFieldValue={formik.setFieldValue}
        />

        <GridItem
          as={Select}
          required
          id="religion"
          label="Religion"
          placeholder="Choose religion"
          value={formik.values.religion}
          error={formik.errors.religion}
          touched={formik.touched.religion}
          onChange={formik.handleChange}
          options={['Christianity', 'Islam', 'Others']}
          setFieldTouched={formik.setFieldTouched}
          setFieldValue={formik.setFieldValue}
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
