import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  fetchBabyWeights as fetchBabyWeightsApi,
  fetchBabyWeight as fetchBabyWeightApi
} from '../services/babyWeightsApi'

export const useBabyWeightsStore = defineStore('weights', () => {
  const weights = ref([])
  const weight = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchBabyWeights = async (id) => {
    loading.value = true
    try {
      const data = await fetchBabyWeightsApi(id)
      console.log('Store Data:', data) // Add this line
      weights.value = data
    } catch (err) {
      console.error('Store Error:', err) // Add this line
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const fetchBabyWeight = async (baby_id, weight_id) => {
    loading.value = true
    try {
      const data = await fetchBabyWeightApi(baby_id, weight_id)
      weight.value = data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const latestWeight = computed(() => {
    if (weights.value.length === 0) {
      console.log('this is null')
      return null
    }
    const latestEntry = weights.value.reduce((latest, entry) => {
      return new Date(entry.timestamp) > new Date(latest.timestamp) ? entry : latest
    })
    console.log('this is latest:' + latestEntry)
    return latestEntry.amount
  })

  return {
    weights,
    weight,
    loading,
    error,
    fetchBabyWeights,
    fetchBabyWeight,
    latestWeight
  }
})
