<template>
  <div>
    <h1>Babies List</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error.message }}</div>
    <ul v-if="!loading && !error">
      <li v-for="baby in babiesStore.babies" :key="baby.id">
        <router-link :to="{ name: 'dashboard', params: { id: baby.id } }">
          {{ baby.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useBabiesStore } from '../stores/babiesStore'

const babiesStore = useBabiesStore()

onMounted(() => {
  babiesStore.fetchBabies()
})
</script>
