<script setup lang="ts">
import { ref } from 'vue'
import { ClipboardDocumentListIcon, UsersIcon, WrenchScrewdriverIcon } from '@heroicons/vue/24/outline'


import type { SideBarItem } from '@/interfaces/sidebar-item'

const showSideMobile = ref<boolean>(false)


const sidebarActions: SideBarItem[] = [
    { name: 'all-services', title: 'Servicios', icon: { name: ClipboardDocumentListIcon } },
    { name: 'all-techs', title: 'Técnicos', icon: { name: WrenchScrewdriverIcon } },
    { name: 'all-clients', title: 'Clientes', icon: { name: UsersIcon } },
]

</script>

<template>
    <main>
        <div>
            <nav class="bg-secondary text-neutral border-b border-base-300 shadow-lg fixed z-30 h-16  w-full">
                <div class="px-3 py-3  h-full flex items-center lg:px-5 lg:pl-3">
                    <div class="flex items-center  w-full justify-between">
                        <div class="flex items-center justify-start">
                            <button @click="showSideMobile = !showSideMobile" id="toggleSidebarMobile" aria-expanded="false"
                                aria-controls="sidebar"
                                class="lg:hidden mr-2 text-accent cursor-pointer p-2 rounded">
                                <svg v-show="!showSideMobile" id="toggleSidebarMobileHamburger" class="w-6 h-6"
                                    fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clip-rule="evenodd"></path>
                                </svg>
                                <svg v-show="showSideMobile" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>

                            </button>
                            <div  class="text-xl font-bold flex items-center lg:ml-2.5">
                                <img src="@/assets/img/logo.png" class="h-9 mr-2 rounded-lg" alt="Windster Logo">
                                <span class="justify-self-center hidden lg:block whitespace-nowrap font-extrabold">CompuActual</span>
                            </div>
                            
                        </div>
                        <div class="dropdown dropdown-bottom  dropdown-end">
                            <div tabindex="0" class="avatar">
                                <div class="w-10 border border-base-300 cursor-pointer rounded-full ">
                                    <img src="@/assets/img/user-icon.png" />
                                </div>
                            </div>
                            <ul tabindex="0" class="dropdown-content  z-[1] p-2 bg-secondary border border-base-300 rounded-lg
                            shadow-xl rounded-box w-52">
                                <li class="hover:bg-primary py-1 px-2 rounded  "><a>Cambiar contraseña</a></li>
                                <li class="hover:bg-primary py-1 px-2 rounded  "><a>Cerrar sesión</a></li>
                    
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="flex overflow-hidden pt-16">
                <aside :class="[showSideMobile ? 'block' : 'hidden']"
                    class="fixed  z-20  h-full top-0 left-0 pt-16  lg:flex flex-shrink-0 flex-col w-56 transition-width duration-75"
                    aria-label="Sidebar">
                    <div
                        class="relative flex-1 flex flex-col min-h-0 bg-secondary shadow-xl text-neutral h-full pt-0">
                        <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <div class="flex-1 px-3  divide-y space-y-1">
                                <ul class="space-y-4 pb-2">
                                    <li v-for="item in sidebarActions" :key="item.name">
                                        <router-link :to="{ name: item.name }"
                                            class="text-base text-gray font-normal  hover:bg-accent/20  rounded-lg flex items-center p-2 group">
                                            <component :is="item.icon.name" class="w-6"></component>
                                            <span class="ml-3 font-medium ">{{ item.title }}</span>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </aside>
                <div v-show="showSideMobile" @click="showSideMobile = !showSideMobile"
                    class="overflow-hidden fixed inset-0 z-10"></div>
                <div class="h-full w-full p-3   relative overflow-y-auto lg:ml-56">
                    <main>
                        <router-view></router-view>
                    </main>

                </div>
            </div>
        </div>

    </main>
</template>



<style scoped>
.router-link-active {
    background-color: hsl(var(--a)/80%);
    color: white;
}

</style>