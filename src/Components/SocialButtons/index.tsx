import { FC } from 'react'
import * as queryString from 'query-string'
import { IconButton, Flex } from '@chakra-ui/react'
import { ImLinkedin2 } from 'react-icons/im'
import { AiOutlineGoogle, AiFillFacebook } from 'react-icons/ai'

import {
  API_URL,
  GOOGLE_CLIENT_ID,
  FACEBOOK_CLIENT_ID,
  LINKEDIN_CLIENT_ID,
  LINKEDIN_STATE
} from 'utils/variables'

const SocialButtons: FC = (): JSX.Element => {
  const googleParams = queryString.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${API_URL}/auth/google`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent'
  })

  const facebookParams = queryString.stringify({
    client_id: FACEBOOK_CLIENT_ID,
    redirect_uri: `${API_URL}/auth/facebook`,
    scope: ['email'],
    response_type: 'code',
    auth_type: 'rerequest',
    display: 'popup'
  })

  const linkedinParams = queryString.stringify({
    client_id: LINKEDIN_CLIENT_ID,
    redirect_uri: `${API_URL}/auth/linkedin`,
    scope: ['r_liteprofile', 'r_emailaddress'].join(' '),
    state: LINKEDIN_STATE,
    response_type: 'code'
  })

  const socialButtons = [
    {
      title: 'google',
      icon: <AiOutlineGoogle size={35} color="#DB4437" />,
      link: `https://accounts.google.com/o/oauth2/v2/auth?${googleParams}`
    },
    {
      title: 'facebook',
      icon: <AiFillFacebook size={35} color="#4267B2" />,
      link: `https://www.facebook.com/v4.0/dialog/oauth?${facebookParams}`,
      props: { mx: 4 }
    },
    {
      title: 'linkedin',
      icon: <ImLinkedin2 size={35} color="#0072b1" />,
      link: `https://www.linkedin.com/oauth/v2/authorization?${linkedinParams}`
    }
  ]

  return (
    <Flex mt={4}>
      {socialButtons.map(sb => (
        <IconButton
          p={0}
          as="a"
          key={sb.link}
          boxSize={8}
          icon={sb.icon}
          href={sb.link}
          aria-label={sb.title}
          bgColor="transparent"
          _hover={{ textDecor: 'none' }}
          _focus={{ textDecor: 'none' }}
          {...sb.props}
        />
      ))}
    </Flex>
  )
}

export default SocialButtons
