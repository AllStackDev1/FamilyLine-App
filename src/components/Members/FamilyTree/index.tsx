import f3 from 'family-chart'
import screenfull from 'screenfull'
import { findDOMNode } from 'react-dom'
import { FC, useRef, useEffect } from 'react'
import { useReactToPrint } from 'react-to-print'
import { Box, HStack, IconButton } from '@chakra-ui/react'
import {
  BsFillShareFill,
  BsFillCursorFill,
  BsFillPrinterFill,
  BsArrowsFullscreen
} from 'react-icons/bs'

import { IMember } from 'interfaces/auth.interface'
import { generateTreeData } from 'utils/helper'

const FamilyTree: FC<{ data: IMember[] }> = ({ data }) => {
  const cont = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cont.current) return
    const card_dim = {
      w: 220,
      h: 70,
      text_x: 75,
      text_y: 15,
      img_w: 60,
      img_h: 60,
      img_x: 5,
      img_y: 5
    }

    const card_display = cardDisplay()

    const store = f3.createStore({
      data: JSON.parse(JSON.stringify(generateTreeData(data))),
      node_separation: 250,
      level_separation: 150
    })

    const view = f3.d3AnimationView({
      store,
      cont: cont.current
    })

    const Card = f3.elements.Card({
      store,
      svg: view.svg,
      card_display,
      mini_tree: true,
      link_break: false,
      card_dim,
      addRelative: f3.handlers.AddRelative({
        store,
        cont: cont.current,
        card_dim
      })
    })

    const onUpdate = props => view.update(props || {})

    view.setCard(Card)
    store.setOnUpdate(onUpdate)
    store.update.tree({ initial: true })

    function cardDisplay() {
      const d1 = d =>
          `${d.data['first_name'] || ''} ${d.data['last_name'] || ''}`,
        d2 = d => `${d.data['date_of_birth'] || ''}`
      return [d1, d2]
    }
  }, [data])

  const toggleFullscreen = () => {
    return (
      cont.current && screenfull.toggle(findDOMNode(cont.current) as Element)
    )
  }

  const handlePrint = useReactToPrint({
    content: () => cont.current
  })

  return (
    <Box pos="relative">
      <style type="text/css" media="print">
        {'\
          @page { size: landscape; }\
        '}
      </style>
      <Box h="2xl" pos="relative" ref={cont} cursor="grabbing" />
      <HStack spacing={5} pos="absolute" bottom={5} right={5}>
        <IconButton
          color="white"
          title="share"
          bg="brand.green.200"
          aria-label="share tree"
          icon={<BsFillShareFill size={20} />}
          // onClick={() => handleClickFullscreen()}
          _active={{ bg: 'white', outline: 'none' }}
          _hover={{ color: 'brand.green.200', bg: 'white' }}
        />

        <IconButton
          color="white"
          title="send"
          bg="brand.green.200"
          aria-label="send tree"
          icon={<BsFillCursorFill size={20} />}
          // onClick={() => handleClickFullscreen()}
          _active={{ bg: 'white', outline: 'none' }}
          _hover={{ color: 'brand.green.200', bg: 'white' }}
        />

        <IconButton
          color="white"
          title="print"
          bg="brand.green.200"
          onClick={handlePrint}
          aria-label="print tree"
          icon={<BsFillPrinterFill size={20} />}
          _active={{ bg: 'white', outline: 'none' }}
          _hover={{ color: 'brand.green.200', bg: 'white' }}
        />

        <IconButton
          color="white"
          bg="brand.green.200"
          onClick={toggleFullscreen}
          title="toggle full screen"
          aria-label="toggle full screen"
          icon={<BsArrowsFullscreen size={20} />}
          _active={{ bg: 'white', outline: 'none' }}
          _hover={{ color: 'brand.green.200', bg: 'white' }}
        />
      </HStack>
    </Box>
  )
}

export default FamilyTree
