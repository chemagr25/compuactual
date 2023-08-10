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
    visible: { admin: true, client: true, tech: false, aside: true }
  },
  {
    name: 'all-techs',
    title: 'Técnicos',
    icon: { name: WrenchScrewdriverIcon },
    visible: { admin: true, client: true, tech: false, aside: true }
  },
  {
    name: 'all-clients',
    title: 'Clientes',
    icon: { name: UsersIcon },
    visible: { admin: true, client: true, tech: false, aside: true }
  },
  {
    name: 'all-clients',
    title: 'Perfil',
    icon: { name: UserCircleIcon },
    visible: { admin: true, client: true, tech: false, aside: false }
  }
]
