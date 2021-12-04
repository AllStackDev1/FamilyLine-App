import { FC, useRef, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import f3 from 'family-chart'
import M from 'materialize-css'

import { Form } from 'components/FamilyChart/Form'
import { familyStore } from 'stores/member.store'

const FamilyChart: FC = () => {
  const cont = useRef<HTMLDivElement>(null)
  const { error, message, isLoading, addFamilyMembers } = familyStore(
    state => state
  )

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
          id: '1',
          rels: {},
          data: {
            first_name: 'Name',
            last_name: 'Surname',
            date_birth: 1970,
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
          `${d.data['first_name'] || ''} ${d.data['last_name'] || ''}`,
        d2 = d => `${d.data['date_birth'] || ''}`
      d1.create_form = '{first_name} {last_name}'
      d2.create_form = '{date_birth}'

      return [d1, d2]
    }

    function cardEditParams() {
      return [
        { type: 'text', placeholder: 'first_name', key: 'first_name' },
        { type: 'text', placeholder: 'last_name', key: 'last_name' },
        { type: 'text', placeholder: 'occupation', key: 'occupation' },
        { type: 'text', placeholder: 'race', key: 'race' },
        { type: 'text', placeholder: 'country', key: 'country' },
        { type: 'text', placeholder: 'tribe', key: 'tribe' },
        { type: 'text', placeholder: 'religion', key: 'religion' },
        { type: 'textarea', placeholder: 'address', key: 'address' },
        { type: 'date', placeholder: 'date_birth', key: 'date_birth' },
        { type: 'file', placeholder: 'avatar', key: 'avatar' }
        // relationship: '',
      ]
    }

    function cardEditForm(props) {
      const postSubmit = props.postSubmit
      props.postSubmit = async ps_props => {
        postSubmit(ps_props)
        const stored_data = store.getData()
        const values = stored_data[stored_data.length - 1]
        const fd = new FormData()

        Object.entries(values.data).forEach((d: any[]) => {
          fd.append(`data.${d[0]}`, d[1])
        })
        fd.append('main', values.main)
        fd.append('rels', JSON.stringify(values.rels))
        await addFamilyMembers(fd)
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
    </>
  )
}

export default FamilyChart
