<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-900/80" />
      </TransitionChild>

      <div class="fixed inset-0 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div v-if="false" class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
              <div class="flex h-16 shrink-0 items-center">
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
              </div>
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      <li>
                        <RouterLink
                          @click="sidebarOpen = false"
                          :to="{ name: 'dashboard', params: { id: selectedBaby.id } }"
                          :class="[
                            router.currentRoute.value.name === 'dashboard'
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                          ]"
                        >
                          <component
                            :is="HomeIcon"
                            :class="[
                              router.currentRoute.value.name === 'dashboard'
                                ? 'text-indigo-600'
                                : 'text-gray-400 group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0'
                            ]"
                            aria-hidden="true"
                          />
                          Dashboard
                        </RouterLink>
                      </li>
                      <li>
                        <RouterLink
                          @click="sidebarOpen = false"
                          :to="{ name: 'nutrition', params: { id: selectedBaby.id } }"
                          :class="[
                            router.currentRoute.value.name === 'nutrition'
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                          ]"
                        >
                          <component
                            :is="HomeIcon"
                            :class="[
                              router.currentRoute.value.name === 'nutrition'
                                ? 'text-indigo-600'
                                : 'text-gray-400 group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0'
                            ]"
                            aria-hidden="true"
                          />
                          Nutrition
                        </RouterLink>
                      </li>
                      <li>
                        <RouterLink
                          @click="sidebarOpen = false"
                          :to="{ name: 'growth', params: { id: selectedBaby.id } }"
                          :class="[
                            router.currentRoute.value.name === 'growth'
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                          ]"
                        >
                          <component
                            :is="HomeIcon"
                            :class="[
                              router.currentRoute.value.name === 'growth'
                                ? 'text-indigo-600'
                                : 'text-gray-400 group-hover:text-indigo-600',
                              'h-6 w-6 shrink-0'
                            ]"
                            aria-hidden="true"
                          />
                          Growth
                        </RouterLink>
                      </li>
                    </ul>
                  </li>
                  <li class="mt-auto">
                    <a
                      @click="sidebarOpen = false"
                      href="#"
                      class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                    >
                      <Cog6ToothIcon
                        class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                      Settings
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <div
    class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
  >
    <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
      <span class="sr-only">Open sidebar</span>
      <Bars3Icon class="h-6 w-6" aria-hidden="true" />
    </button>

    <!-- Separator -->
    <div class="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

    <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
      <form class="relative flex flex-1" action="#" method="GET">
        <label for="search-field" class="sr-only">Search</label>
        <MagnifyingGlassIcon
          class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
          aria-hidden="true"
        />
        <input
          id="search-field"
          class="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
          placeholder="Search..."
          type="search"
          name="search"
        />
      </form>
      <div class="flex items-center gap-x-4 lg:gap-x-6">
        <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
          <span class="sr-only">View notifications</span>
          <BellIcon class="h-6 w-6" aria-hidden="true" />
        </button>

        <!-- Separator -->
        <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

        <!-- Baby Selection -->
        <selector />
      </div>
    </div>
  </div>
</template>

<script setup>
import selector from '../components/BabySelector.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { TransitionRoot, TransitionChild } from '@headlessui/vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, BellIcon, Cog6ToothIcon, HomeIcon, XMarkIcon } from '@heroicons/vue/24/outline'

import { useBabiesStore } from '@/stores/babiesStore'
const babiesStore = useBabiesStore()

const selectedBaby = computed(() => babiesStore.selectedBaby)

import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

const sidebarOpen = ref(false)

const router = useRouter()
</script>
