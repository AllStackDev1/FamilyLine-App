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

  if (!imageFile && !src) return <div />
  if (loading) return <div>loading...</div>

  return (
    <Avatar
      name={(imageFile && imageFile.name) || alt}
      src={thumb || src}
      bgColor="white"
      size="xl"
      {...rest}
    />
  )
}

export default Thumb
