import { FC, useRef, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import f3 from 'family-chart'

const FamilyTree: FC<{ data: any }> = ({ data }) => {
  const cont = useRef<HTMLDivElement>(null)

  console.log(data)

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
      data,
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
      d1.create_form = '{first_name} {last_name}'
      d2.create_form = '{date_of_birth}'

      return [d1, d2]
    }

    return () => {
      document.head.lastElementChild?.remove()
    }
  }, [data])

  return (
    <>
      <div id="form_modal" className="modal" />
      <Box maxH="calc(100vh - 80px)" h="2xl" pos="relative" ref={cont} />
    </>
  )
}

export default FamilyTree
