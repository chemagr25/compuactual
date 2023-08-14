import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue'

export interface icon {
  name: FunctionalComponent<HTMLAttributes & VNodeProps>
}

interface visible {
  client: boolean
  tech: boolean
  aside: boolean
}

export interface SideBarItem {
  title: string
  name: string
  icon: icon
  visible: visible
}
