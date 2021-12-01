/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Box } from '@chakra-ui/react'
import { Listbox } from '@headlessui/react'
import { IOptions } from 'Interfaces/forms.interface'
import ListBoxOption from 'Components/Forms/Select/ListBox/ListBoxOption'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)
const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }

const ListBoxOptions: React.FC<IOptions<any>> = ({ options }) => {
  return (
    <Listbox.Options
      as={MotionBox}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { ...transition } }}
      exit={{ opacity: 0, transition: { ...transition } }}
      pos="absolute"
      w="full"
      py={1}
      mt={1}
      overflow="auto"
      fontSize="md"
      bg="white"
      rounded="md"
      shadow="lg"
      maxH={64}
      borderWidth={1}
      zIndex={2}
    >
      {options.map((item: any) => (
        <ListBoxOption key={item?.id || item} item={item} />
      ))}
    </Listbox.Options>
  )
}

export default ListBoxOptions
