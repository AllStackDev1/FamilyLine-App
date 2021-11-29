import { FC, useEffect } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import {
  Box,
  Text,
  Grid,
  Flex,
  Link,
  Heading,
  Divider,
  GridItem,
  useToast
} from '@chakra-ui/react'

import useAuth from 'utils/Providers/AuthContextProvider'

import Wrapper from 'container/Layout'

import { Input, InputWithIcon } from 'components/Forms'
import { FilledButton } from 'components/Buttons'
import { IUser } from 'interfaces/auth.interface'

import MomDaughter from 'assets/images/mom-daughter.png'
import SocialButtons from 'components/SocialButtons'

import { authStore } from 'stores/auth.store'

const Register: FC = () => {
  document.title = 'Family Line | Register'

  const { show, setShow } = useAuth()
  const { error, user, message, isLoading, register } = authStore(
    state => state
  )

  const formik = useFormik<Partial<IUser>>({
    initialValues: {
      firstname: '',
      lastname: '',
      phonenumber: '',
      email: '',
      password: ''
    },
    onSubmit: async values => {
      await register(values)
    }
  })

  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      toast({
        duration: 8000,
        isClosable: true,
        position: 'top-right',
        description: error,
        status: 'error',
        title: 'An error occurred'
      })
    }

    if (user) {
      navigate('/register/success')
    }

    return () => {
      authStore.setState({ error: null, message: null })
    }
  }, [error, message, user])

  return (
    <Wrapper isAuth>
      <Grid
        my={{ xl: 10 }}
        shadow={{ xl: 'xl' }}
        borderRadius={{ xl: 'xl' }}
        h={{ base: '100vh', xl: 'full' }}
        templateColumns={{ xl: '50% 50%' }}
        w={{ base: 'full', '2xl': '80%', '4xl': '70%' }}
      >
        <GridItem
          color="white"
          bgSize="cover"
          bgPos="center"
          bgRepeat="no-repeat"
          borderLeftRadius="xl"
          bgImage={`${MomDaughter}`}
          d={{ base: 'none', xl: 'unset' }}
        >
          <Flex
            bgRepeat="no-repeat"
            roundedLeft="xl"
            bg="brand.bg.50"
            flexDir="column"
            justify="center"
            align="center"
            bgSize="cover"
            bgPos="center"
            h="full"
          >
            <Box w="90%" textAlign="center">
              <Heading fontWeight={600} fontSize="6xl">
                Hello Welcome!
              </Heading>
              <Text mt={{ lg: 4 }} fontWeight={500} fontSize="2xl">
                Stay connected with your generation on one single platform
              </Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem w="full" bg="brand.bg.100" borderRightRadius={{ xl: 'xl' }}>
          <Box p={8}>
            <Flex mb={{ base: 5, lg: 8 }} flexDir="column" align="center">
              <Heading fontSize={{ base: 'xl', xl: '4xl' }}>
                Create An Account
              </Heading>
              <Divider
                mt={2}
                borderWidth={2}
                w={{ base: 36, xl: 64 }}
                borderColor="brand.green.200"
              />
              <SocialButtons />
            </Flex>
            <form onSubmit={formik.handleSubmit}>
              <Grid gap={4}>
                <GridItem
                  as={Input}
                  required
                  type="text"
                  id="firstname"
                  label="First Name"
                  placeholder="Joh"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                  error={formik.errors.firstname}
                  touched={formik.touched.firstname}
                  setFieldTouched={formik.setFieldTouched}
                />

                <GridItem
                  as={Input}
                  required
                  type="text"
                  id="lastname"
                  label="Last Name"
                  placeholder="Joh"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                  error={formik.errors.lastname}
                  touched={formik.touched.lastname}
                  setFieldTouched={formik.setFieldTouched}
                />

                <GridItem
                  as={Input}
                  required
                  id="email"
                  type="email"
                  label="Email"
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error={formik.errors.email}
                  touched={formik.touched.email}
                  onChange={formik.handleChange}
                  setFieldTouched={formik.setFieldTouched}
                  placeholder="abc@test.com"
                />

                <GridItem
                  as={Input}
                  required
                  type="text"
                  id="phonenumber"
                  label="Phone Number"
                  onBlur={formik.handleBlur}
                  value={formik.values.phonenumber}
                  error={formik.errors.phonenumber}
                  touched={formik.touched.phonenumber}
                  onChange={formik.handleChange}
                  setFieldTouched={formik.setFieldTouched}
                  placeholder="0237200000"
                />

                <GridItem
                  as={InputWithIcon}
                  required
                  id="password"
                  label="Password"
                  placeholder="●●●●●●●●●●"
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  error={formik.errors.password}
                  touched={formik.touched.password}
                  onChange={formik.handleChange}
                  icon={show ? FiEye : FiEyeOff}
                  type={show ? 'text' : 'password'}
                  setFieldTouched={formik.setFieldTouched}
                  iconAction={() => setShow(!show)}
                />

                <GridItem d="flex" mt={5} flexDir="column" alignItems="center">
                  <Text fontSize={{ base: 10, xl: 12 }} textAlign="center">
                    <Text as="span" fontWeight={500}>
                      By clicking on Sign up, you agree to our
                    </Text>{' '}
                    <Link
                      fontWeight={600}
                      to="/terms-&-conditions"
                      color="brand.green.200"
                    >
                      Terms & Conditions
                    </Link>
                  </Text>
                  <Box mt={5} />
                  <FilledButton
                    w={36}
                    type="submit"
                    title="Sign Up"
                    isLoading={isLoading}
                    isDisabled={isLoading || !(formik.dirty && formik.isValid)}
                  />
                </GridItem>
              </Grid>
            </form>
          </Box>
        </GridItem>
      </Grid>
    </Wrapper>
  )
}

export default Register
