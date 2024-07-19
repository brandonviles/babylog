<template>
  <div class="mt-8" v-if="selectedMonth">
    <h2 class="text-base font-semibold leading-6 text-gray-900">Feed History</h2>
    <div class="lg:grid lg:grid-cols-12 lg:gap-x-16">
      <div
        class="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9"
      >
        <div class="flex items-center text-gray-900">
          <button
            @click="goToPreviousMonth"
            type="button"
            class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">Previous month</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </button>
          <div class="flex-auto text-sm font-semibold">
            {{ moment(selectedMonth).format('MMMM YYYY') }}
          </div>
          <button
            @click="goToNextMonth"
            type="button"
            class="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">Next month</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div
          class="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200"
        >
          <button
            @click="selectedDate = day"
            v-for="(day, dayIdx) in daysInMonth"
            :key="day.toString()"
            type="button"
            :class="[
              'py-1.5 hover:bg-gray-100 focus:z-10',
              isCurrentMonth(day) ? 'bg-white' : 'bg-gray-50',
              (isSelected(day) || isToday(day)) && 'font-semibold',
              isSelected(day) && 'text-white',
              !isSelected(day) && isCurrentMonth(day) && !isToday(day) && 'text-gray-900',
              !isSelected(day) && isCurrentMonth(day) && !isToday(day) && 'text-gray-400',
              day.isToday && !isSelected(day) && 'text-indigo-600',
              dayIdx === 0 && 'rounded-tl-lg',
              dayIdx === 6 && 'rounded-tr-lg',
              dayIdx === daysInMonth.length - 7 && 'rounded-bl-lg',
              dayIdx === daysInMonth.length - 1 && 'rounded-br-lg'
            ]"
            :disabled="isFuture(day)"
          >
            <time
              :datetime="day.getDate()"
              :class="[
                'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                isSelected(day) && isToday(day) && 'bg-indigo-600',
                isSelected(day) && !isToday(day) && 'bg-gray-900'
              ]"
              >{{ day.getDate() }}</time
            >
          </button>
        </div>
      </div>
      <div class="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-base font-semibold leading-6 text-gray-900">
              {{ moment(selectedDate).format('dddd, MMMM Do, YYYY') }}
            </h1>
          </div>
        </div>

        <div class="mt-8">
          <h1 class="text-base font-semibold leading-6 text-gray-900">Quick Stats</h1>

          <ul
            role="list"
            class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
          >
            <li class="col-span-1 flex rounded-md shadow-sm">
              <div
                class="flex flex-1 items-center justify-between truncate rounded-md border border-gray-200 bg-white"
              >
                <div class="flex-1 truncate px-4 py-2 text-sm">
                  <a href="#" class="font-medium text-gray-900 hover:text-gray-600">Total Feed</a>
                  <p class="text-gray-500">{{ totalFeeds }} ml</p>
                </div>
                <div class="flex-shrink-0 pr-2">
                  <button
                    type="button"
                    class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span class="sr-only">Open options</span>
                    <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="mt-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table v-if="filteredFeeds.length" class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Time Finished
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="feed in filteredFeeds" :key="feed.id">
                      <td
                        class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                      >
                        {{ moment(feed.timestamp).format('LT') }}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {{ feed.amount }} ml
                      </td>
                      <td
                        class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                      >
                        <a href="#" class="text-indigo-600 hover:text-indigo-900"
                          >Edit<span class="sr-only">, {{ feed.timestamp }}</span></a
                        >
                        |
                        <a
                          @click.prevent="deleteFeed(feed.timestamp)"
                          href="#"
                          class="text-warning hover:text-indigo-900"
                          >Delete</a
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'

import { onMounted, ref, computed } from 'vue'
import moment from 'moment'
const selectedDate = ref(moment())
const selectedMonth = ref(moment()) // Initialize selectedMonth to the current month

const goToPreviousMonth = () => {
  selectedMonth.value = moment(selectedMonth.value).subtract(1, 'month').format('MMMM YYYY')
}

const goToNextMonth = () => {
  selectedMonth.value = moment(selectedMonth.value).add(1, 'month').format('MMMM YYYY')
}

const daysInMonth = computed(() => {
  const startOfWeek = moment(selectedMonth.value).startOf('month').startOf('week')
  const endOfWeek = moment(selectedMonth.value).endOf('month').endOf('week')

  const days = []
  let day = startOfWeek

  while (day <= endOfWeek) {
    days.push(day.toDate())
    day = day.clone().add(1, 'd')
  }

  return days
})

const isSelected = (day) => {
  return moment(day).isSame(selectedDate.value, 'day')
}

const isToday = (day) => {
  return moment(day).isSame(moment(), 'day')
}

const isCurrentMonth = (day) => {
  return moment(day).isSame(selectedMonth.value, 'month')
}

const isFuture = (day) => {
  return moment(day).isAfter(moment(), 'day')
}

console.log(daysInMonth.value)

import { useBabyFeedsStore } from '@/stores/babyFeedsStore'
const babyFeedsStore = useBabyFeedsStore()

const filteredFeeds = computed(() => {
  return babyFeedsStore.feeds.filter((feed) =>
    moment(feed.timestamp).isSame(selectedDate.value, 'day')
  )
})

const totalFeeds = computed(() => {
  return filteredFeeds.value.reduce((total, feed) => total + feed.amount, 0)
})

onMounted(() => {
  console.log('Component mounted')
})

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
</script>
