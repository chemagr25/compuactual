import type { FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';

export interface icon {
    name: FunctionalComponent<HTMLAttributes & VNodeProps>
}

export interface SideBarItem {
    title: string,
    name: string,
    icon : icon
}