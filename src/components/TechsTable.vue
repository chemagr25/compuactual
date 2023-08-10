<script setup lang="ts">
import { onMounted } from 'vue'
import { useTech } from '@/composables/useTech'
import { EyeIcon } from '@heroicons/vue/24/outline'
import Loader from '@/components/Loader.vue'
import PaginationTable from './PaginationTable.vue'

const { isLoading, getAllTechs, technicians, page, totalPages } = useTech()

import TechAddForm from '@/components/techAddForm.vue'

const getPage = async (newPage: number) => {
  if (page.value + 1 === newPage) return
  page.value = newPage - 1
  await getAllTechs()
}

onMounted(async () => {
  await getAllTechs()
})
</script>

<template>
  <div v-if="isLoading" class="w-full h-full overflow-hidden flex mt-5 justify-center">
    <Loader />
  </div>

  <div v-else>
    <div class="w-full flex justify-between items-center mb-3 rounded-sm">
      <TechAddForm />
      <div class="w-3/4 lg:w-1/4">
        <input
          type="text"
          placeholder="Buscar técnico "
          class="input bg-secondary focus:outline-none border border-base-300 text-neutral input-bordered w-full"
        />
      </div>
    </div>
    <div class="bg-secondary rounded-lg border shadow-lg border-base-300 text-neutral">
      <div class="overflow-x-auto">
        <table class="table">
          <thead class="text-neutral text-sm">
            <tr class="">
              <th>Nombre</th>
              <th>Nombre de Usuario</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tech of technicians">
              <th>{{ tech.id }} {{ tech.name }} {{ tech.lastName }}</th>
              <th>{{ tech.username }}</th>
              <th>{{ tech.email }}</th>
              <th>{{ tech.phone }}</th>

              <td>
                <div class="w-full flex justify-center">
                  <div class="rounded-xl hover:bg-gray-500/50 flex gap-2 px-2 py-1.5">
                    <router-link
                      class="flex gap-1"
                      :to="{ name: 'tech-details', params: { id: tech.id } }"
                    >
                      <EyeIcon class="w-4"></EyeIcon>
                      <p class="hidden lg:block">Ver detalles</p>
                    </router-link>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="mt-5 flex justify-center">
      <PaginationTable
        @getPage="getPage"
        :currentPage="page + 1"
        :totalPages="totalPages"
      ></PaginationTable>
    </div>
  </div>
</template>

<style scoped></style>
