<script setup lang="ts">
import LoaderButton from '@/components/LoaderButton.vue'

import { useLogin } from '@/composables/useLogin'

const { username, password, sendLogin, hasError, isLoading } = useLogin()

</script>

<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-secondary border border-base-300 shadow-2xl p-5 rounded-lg">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 class="mb-4 text-center text-2xl font-bold leading-9 tracking-tight text-neutral">Iniciar sesión</h2>
            </div>
            <form @submit.prevent class="space-y-6 text-neutral">
                <div>
                    <label for="email" class="block text-base font-medium leading-6 text-neutral">Nombre de usuario</label>
                    <div class="mt-2">
                        <input id="email" v-model="username" placeholder="user123" name="email" type="text"
                            autocomplete="email"
                            class="block w-full  border  border-base-300 rounded-md bg-primary   p-2 shadow-sm  font-medium text-base outline-none  sm:leading-6" />
                    </div>
                </div>
                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-base font-medium leading-6 text-neutral">Contraseña</label>
                    </div>
                    <div class="mt-2">
                        <input id="password" v-model="password" name="password" placeholder="Contraseña" type="password"
                            autocomplete="current-password"
                            class="block w-full bg-primary border   border-base-300 outline-none rounded-md  p-2 shadow-sm text-base font-semibold sm:leading-6" />
                    </div>
                    <div class="text-sm -mb-2 mt-2">
                        <a href="#" class="font-semibold text-accent">Olvidaste tu contraseña?</a>
                    </div>
                </div>
                <div>

                    <button @click="sendLogin" :disabled="isLoading"
                        class="flex w-full h-8 items-center justify-center rounded-md  px-3 bg-accent y-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">
                        <LoaderButton v-if="isLoading" />
                        <p v-else class="font-semibold">Iniciar sesión</p>
                    </button>

                </div>
            </form>
        </div>
    </div></template>
