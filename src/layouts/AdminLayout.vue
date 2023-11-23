<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { sidebarActions } from '@/shared/sidebarActions'
import ChangeTheme from '@/components/ChangeTheme.vue'

import BottomNavigation from '@/components/BottomNavigation.vue'
import router from '@/router'

const isTech = ref(localStorage.getItem('role') === 'ROLE_TECHNICIAN')
const isUser = ref(localStorage.getItem('role') === 'ROLE_USER')

const logout = () => {
  localStorage.removeItem('token_auth')
  localStorage.removeItem('role')
  localStorage.removeItem('uid')
  router.push({ name: 'login' })
}

console.log(isTech.value)
const showSideMobile = ref<boolean>(false)
</script>

<template>
  <main>
    <div class="mb-20">
      <nav class="bg-secondary text-neutral fixed z-20 h-14 w-full">
        <div class="px-3 py-3 h-full flex items-center lg:px-5 lg:pl-3">
          <div class="flex items-center w-full justify-between">
            <div class="flex items-center justify-start">
              <button
                @click="showSideMobile = !showSideMobile"
                id="toggleSidebarMobile"
                aria-expanded="false"
                aria-controls="sidebar"
                class="hidden md:block lg:hidden mr-2 text-accent cursor-pointer p-2 rounded"
              >
                <svg
                  v-show="!showSideMobile"
                  id="toggleSidebarMobileHamburger"
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <svg
                  v-show="showSideMobile"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div class="text-xl font-bold flex items-center lg:ml-2.5">
                <img src="@/assets/img/logo.png" class="h-9 mr-2 rounded-lg" alt="Windster Logo" />
                <span class="justify-self-center hidden lg:block whitespace-nowrap font-extrabold"
                  >CompuActual</span
                >
              </div>
            </div>
            <div class=" md:flex gap-8">
              <div class="dropdown dropdown-bottom flex dropdown-end">
                <div tabindex="0" class="avatar">
                  <div class="w-10 cursor-pointer rounded-full">
                    <img src="@/assets/img/user-icon.png" />
                  </div>
                </div>

                <ul
                  tabindex="0"

                  class="dropdown-content z-[1] p-2 bg-secondary border border-base-300 rounded-lg shadow-xl rounded-box w-52"
                >
                  <li class="hover:bg-primary py-1 px-2 rounded cursor-pointer">
                    <a>Cambiar contraseña</a>
                  </li>
                  <li @click="logout" class="hover:bg-primary cursor-pointer py-1 px-2 rounded "><a>Cerrar sesión</a></li>
                  <li class="hover:bg-primary cursor-pointer py-1 px-2 rounded "> <ChangeTheme></ChangeTheme></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div class="flex overflow-hidden pt-20">
        <aside
          :class="[showSideMobile ? 'block' : 'hidden']"
          class="fixed z-10 h-full  top-0 left-0 pt-14 lg:flex flex-shrink-0 flex-col w-[10rem] transition-width duration-75"
          aria-label="Sidebar"
        >
          <div
            class="relative flex-1 flex flex-col min-h-0 bg-secondary shadow-2xl text-neutral h-full pt-0"
          >
            <div class="flex-1 flex flex-col pt-[2rem] pb-4 overflow-y-auto">
              <div class="flex-1  pl-2 pr-4 flex flex-col">
                <ul v-if="!isUser" class="space-y-3 ">
                  <li v-for="item in sidebarActions" :key="item.name">
                    <div v-if="!isTech">
                      <router-link
                        v-if="item.visible.aside"
                        :to="{ name: item.name }"
                        class="text-md text-gray ml-2 hover:font-bold rounded-lg  flex items-center py-3 group"
                      >
                        <component :is="item.icon.name" class="w-5"></component>
                        <p class="ml-3 font-normal">{{ item.title }}</p>
                      </router-link>
                    </div>
                    <router-link
                      v-else
                      v-if="item.visible.aside && item.visible.tech"
                      :to="{ name: item.name }"
                      class="text-lg text-gray ml-2 font-normal hover:font-bold rounded-lg flex items-center p-2.5 group"
                    >
                      <component :is="item.icon.name" class="w-7"></component>
                      <span class="ml-3 font-normal">{{ item.title }}</span>
                    </router-link>
                  </li>
                </ul>
                <ul v-if="isUser" class="space-y-4  pb-2">
                  <li v-for="item in sidebarActions" :key="item.name">
                    <div class="" v-if="!isTech">
                      <router-link
                        v-if="item.visible.client && item.visible.aside"
                        :to="{ name: item.name }"
                        class="text-lg text-gray ml-2 font-normal hover:bg-accent/20 rounded-lg flex items-center p-2.5 group"
                      > 
                      <p>
                        <component :is="item.icon.name" class="w-8"></component>
                        <p class="ml-3 font-normal">{{ item.title }}</p>

                      </p>
                        
                      </router-link>
                    </div>
                  
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div></div>
        </aside>

        <div class="h-full w-full p-3 mt-2 relative overflow-y-auto lg:ml-44">
          <main>
            <router-view></router-view>
          </main>
        </div>
      </div>
    </div>

    <BottomNavigation  class="md:hidden" :items="sidebarActions"></BottomNavigation>
  </main>
</template>

<style scoped>
.router-link-active p  {
  font-weight: bold;
  font-size: 1.1rem;
}
</style>
