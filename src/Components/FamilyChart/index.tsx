import { FC, useRef, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import f3 from 'family-chart'

import { Form } from 'Components/FamilyChart/Form'
import { Views } from 'pages/my-family'
import { FilledButton } from 'Components/Buttons'

import M from 'materialize-css'

const FamilyChart: FC<{ toggle: (e: Views) => void }> = ({ toggle }) => {
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

    const card_edit = cardEditParams()

    const card_display = cardDisplay()

    const store = f3.createStore({
      data: [
        {
          id: '0',
          rels: {},
          data: {
            'first name': 'Name',
            'last name': 'Surname',
            birthday: 1970,
            avatar:
              'https://static8.depositphotos.com/1009634/988/v/950/depositphotos_9883921-stock-illustration-no-user-profile-picture.jpg',
            gender: 'M'
          }
        }
      ],
      node_separation: 250,
      level_separation: 150
    })

    const view = f3.d3AnimationView({
      store,
      cont: cont.current,
      card_edit
    })

    const Card = f3.elements.Card({
      store,
      svg: view.svg,
      card_display,
      mini_tree: true,
      link_break: false,
      card_dim,
      cardEditForm,
      addRelative: f3.handlers.AddRelative({
        store,
        cont: cont.current,
        card_dim,
        cardEditForm,
        labels: { mother: 'Add mother' }
      })
    })

    const onUpdate = props => view.update(props || {})

    view.setCard(Card)
    store.setOnUpdate(onUpdate)
    store.update.tree({ initial: true })

    function cardDisplay() {
      const d1 = d =>
          `${d.data['first name'] || ''} ${d.data['last name'] || ''}`,
        d2 = d => `${d.data['birthday'] || ''}`
      d1.create_form = '{first name} {last name}'
      d2.create_form = '{birthday}'

      return [d1, d2]
    }

    function cardEditParams() {
      return [
        { type: 'text', placeholder: 'first name', key: 'first name' },
        { type: 'text', placeholder: 'last name', key: 'last name' },
        { type: 'text', placeholder: 'birthday', key: 'birthday' },
        { type: 'text', placeholder: 'avatar', key: 'avatar' }
      ]
    }

    function cardEditForm(props) {
      const postSubmit = props.postSubmit
      props.postSubmit = ps_props => {
        postSubmit(ps_props)
      }
      const el = document.querySelector('#form_modal')
      const modal = M.Modal.init(el)
      const edit = {
        el,
        open: () => {
          require('./form.css')
          modal.open()
        },
        close: () => modal.close()
      }
      Form({ ...props, card_edit, card_display, edit })
    }

    return () => {
      document.head.lastElementChild?.remove()
    }
  }, [])

  return (
    <>
      <div id="form_modal" className="modal" />
      <Box maxH="calc(100vh - 80px)" h="2xl" pos="relative" ref={cont} />
      <Box textAlign="right" mt={10}>
        <FilledButton
          w={44}
          title="Add Family"
          onClick={() => {
            toggle('add')
          }}
        />
      </Box>
    </>
  )
}

export default FamilyChart
