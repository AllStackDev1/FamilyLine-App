declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare module '*.png' {
  const value: React.FunctionComponent<
    React.ImgHTMLAttributes<HTMLImageElement>
  >
  export default value
}

declare module '*.jpg' {
  const value: React.FunctionComponent<
    React.ImgHTMLAttributes<HTMLImageElement>
  >
  export default value
}

declare module '*.jpeg' {
  const value: React.FunctionComponent<
    React.ImgHTMLAttributes<HTMLImageElement>
  >
  export default value
}

declare module 'family-chart' {
  interface ICreateStore {
    data: any[]
    cont: any
    card_display: any[]
    mini_tree: boolean
    hide_rels: boolean
    node_separation: number
    level_separation: number
    card_dim: {
      w: number
      h: number
      text_x: number
      text_y: number
      img_w: number
      img_h: number
      img_x: number
      img_y: number
    }
  }

  const value: {
    createStore: (c: ICreateStore) => any
    d3AnimationView: (c: any) => any
  }
  export default value
}
