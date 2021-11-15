import { FC } from 'react'
import { useFormik } from 'formik'
import { Box, Grid, Flex, GridItem } from '@chakra-ui/react'
import { FilledButton } from 'Components/Buttons'
import { Input, Select } from 'Components/Forms'
import { IUser } from 'Interfaces/auth.interface'
import useAuth from 'Utils/Providers/AuthContextProvider'

const AddMemberForm: FC<{ isAdd?: boolean }> = ({ isAdd }) => {
  const { isLoading, login } = useAuth()

  interface IForm extends Partial<IUser> {
    relationship: string
  }

  const formik = useFormik<IForm>({
    initialValues: {
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
              title="Update & View"
              isLoading={isLoading}
              isDisabled={isLoading || !(formik.dirty && formik.isValid)}
            />
            <Box mx={2} />
            <FilledButton
              w={44}
              type="submit"
              bgColor="white"
              title="Add Family"
              isLoading={isLoading}
              isDisabled={isLoading || !(formik.dirty && formik.isValid)}
            />
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
