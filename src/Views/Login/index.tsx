import { FC } from 'react'
import { useFormik } from 'formik'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import {
  Box,
  Text,
  Grid,
  Flex,
  GridItem,
  Heading,
  Divider
} from '@chakra-ui/react'

import useAuth from 'Utils/Providers/AuthContextProvider'
import Wrapper from 'Container/Layout/Wrapper'

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
    <Wrapper>
      <Grid
        shadow="xl"
        borderRadius="xl"
        my={{ '2xl': 10 }}
        templateColumns={{ md: '50% 50%' }}
        w={{ md: '90%', '2xl': '80%', '4xl': '70%' }}
      >
        <GridItem
          color="white"
          bgSize="cover"
          bgPos="center"
          bgRepeat="no-repeat"
          borderLeftRadius="xl"
          bgImage={`${Family}`}
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
        <GridItem bg="brand.bg.100" borderRightRadius="xl">
          <Box px={{ lg: 8 }} pt={{ lg: 20 }} pb={{ lg: 24 }}>
            <Flex mb={{ lg: 8 }} flexDir="column" align="center">
              <Heading>Log Into Your Account</Heading>
              <Divider
                mt={2}
                w="64"
                borderWidth={2}
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
              </Grid>
              <Box textAlign="center" mt={{ lg: 28 }}>
                <FilledButton
                  w={36}
                  type="submit"
                  title="Login"
                  isLoading={isLoading}
                  isDisabled={isLoading || !(formik.dirty && formik.isValid)}
                />
              </Box>
            </form>
          </Box>
        </GridItem>
      </Grid>
    </Wrapper>
  )
}

export default Login
