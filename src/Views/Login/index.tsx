import { FC } from 'react'
import { useFormik } from 'formik'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import {
  Box,
  Text,
  Link,
  Grid,
  Flex,
  GridItem,
  Heading,
  Divider
} from '@chakra-ui/react'

import useAuth from 'Utils/Providers/AuthContextProvider'
import Wrapper from 'Container/Layout'

import { Input, InputWithIcon } from 'Components/Forms'
import { IUser } from 'Interfaces/auth.interface'
import { FilledButton } from 'Components/Buttons'

import Family from 'Assets/Images/family.png'
import SocialButtons from 'Components/SocialButtons'

const Login: FC = () => {
  document.title = 'Family Line | Login'

  const { show, setShow, isLoading, login } = useAuth()

  const formik = useFormik<Partial<IUser>>({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async values => {
      await login(values)
    }
  })

  return (
    <Wrapper active={6}>
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
          bgImage={`${Family}`}
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
                Welcome Back!
              </Heading>
              <Text mt={{ lg: 4 }} fontWeight={500} fontSize="2xl">
                Stay connected with your generation on one single platform
              </Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem w="full" bg="brand.bg.100" borderRightRadius={{ xl: 'xl' }}>
          <Box px={8} pt={{ base: 8, lg: 20 }} pb={{ lg: 24 }}>
            <Flex mb={{ base: 5, lg: 8 }} flexDir="column" align="center">
              <Heading fontSize={{ base: 'xl', xl: '4xl' }}>
                Log Into Your Account
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
                    title="Login"
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

export default Login
