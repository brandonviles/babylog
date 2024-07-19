<template>
  <DefaultLayout>
    <div v-if="babiesStore.loading">Loading...</div>
    <div v-if="babiesStore.error">{{ babiesStore.error.message }}</div>
    <div v-if="!babiesStore.loading && !babiesStore.error && babiesStore.baby">
      <h1>{{ babiesStore.baby.name }}</h1>
      <!-- Add more baby details here -->
    </div>
  </DefaultLayout>
</template>

<script setup>
// import { onMounted } from 'vue'
// import { useRoute } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { useBabiesStore } from '../stores/babiesStore'

// const route = useRoute()
const babiesStore = useBabiesStore()

// onMounted(() => {
//   const id = route.params.id
//   babiesStore.fetchBaby(id)
// })
</script>
