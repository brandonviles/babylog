// src/stores/babiesStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchBabies as fetchBabiesApi, fetchBaby as fetchBabyApi } from '../services/babiesApi'

export const useBabiesStore = defineStore('babies', () => {
  const babies = ref([])
  const baby = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchBabies = async () => {
    loading.value = true
    try {
      const data = await fetchBabiesApi()
      console.log('Store Data:', data) // Add this line
      babies.value = data
    } catch (err) {
      console.error('Store Error:', err) // Add this line
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const fetchBaby = async (id) => {
    loading.value = true
    try {
      const data = await fetchBabyApi(id)
      baby.value = data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    babies,
    baby,
    loading,
    error,
    fetchBabies,
    fetchBaby
  }
})
