import { FC, useRef, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import f3 from 'family-chart'

import data from './data.json'
import { FilledButton } from 'Components/Buttons'
import { Views } from 'Views/MyFamily'

const FamilyChart: FC<{ toggle: (e: Views) => void }> = ({ toggle }) => {
  const cont = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cont.current) return
    const store = f3.createStore({
      data: data,
      cont: cont.current,
      card_display: [d => d.data.label || '', d => d.data.desc || ''],
      mini_tree: true,
      hide_rels: true,
      node_separation: 250,
      level_separation: 150,
      card_dim: {
        w: 220,
        h: 70,
        text_x: 75,
        text_y: 15,
        img_w: 60,
        img_h: 60,
        img_x: 5,
        img_y: 5
      }
    })
    const view = f3.d3AnimationView(store)

    store.setOnUpdate(props =>
      view.update({ tree: store.state.tree, ...(props || {}) })
    )
    store.update.tree()
  }, [])

  return (
    <Box>
      <Box maxH="calc(100vh - 80px)" h="2xl" pos="relative" ref={cont} />
      <Box textAlign="right" mt={10}>
        <FilledButton w={44} title="Add Family" onClick={() => toggle('add')} />
      </Box>
    </Box>
  )
}

export default FamilyChart
