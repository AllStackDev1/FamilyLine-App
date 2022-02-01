/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState, useRef } from 'react'
import { Avatar, AvatarProps } from '@chakra-ui/react'

interface IProps {
  imageFile?: any
  src?: any
  alt?: any
}

const Thumb: FC<IProps & AvatarProps> = ({ imageFile, src, alt, ...rest }) => {
  const [loading, setLoading] = useState(false)
  const [thumb, setThumb] = useState<any>()

  const prevImageFileRef = useRef()

  useEffect(() => {
    if (imageFile && imageFile !== prevImageFileRef.current) {
      prevImageFileRef.current = imageFile
      setLoading(true)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLoading(false)
        setThumb(reader.result)
      }
      reader.readAsDataURL(imageFile)
    }
  }, [imageFile])

  if (loading) return <div>loading...</div>

  return (
    <Avatar
      name={(imageFile && imageFile.name) || alt}
      src={thumb || src}
      size="xl"
      filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
      bgGradient="linear(to-l,  #02993E, #00BF4D)"
      colorScheme="brandGreen"
      {...rest}
    />
  )
}

export default Thumb
