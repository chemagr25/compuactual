import type { SideBarItem } from '@/interfaces/sidebar-item'
import {
  ClipboardDocumentListIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  UserCircleIcon
} from '@heroicons/vue/24/outline'

export const sidebarActions: SideBarItem[] = [
  {
    name: 'all-services',
    title: 'Servicios',
    icon: { name: ClipboardDocumentListIcon },
    visible: {  client: false, tech: true, aside: true }
  },
  {
    name: 'all-techs',
    title: 'Técnicos',
    icon: { name: WrenchScrewdriverIcon },
    visible: {  client: false, tech: false, aside: true }
  },
  {
    name: 'all-clients',
    title: 'Clientes',
    icon: { name: UsersIcon },
    visible: {  client: false, tech: false, aside: true }
  },
  {
    name: 'all-clients',
    title: 'Perfil',
    icon: { name: UserCircleIcon },
    visible: {  client: true, tech: false, aside: false }
  }
]
