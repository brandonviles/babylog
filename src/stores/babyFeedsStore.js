import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  fetchBabyFeeds as fetchBabyFeedsApi,
  fetchBabyFeed as fetchBabyFeedApi,
  logFeed as logFeedApi,
  deleteFeed as deleteFeedApi
} from '../services/babyFeedsApi'

export const useBabyFeedsStore = defineStore('feeds', () => {
  const feeds = ref([])
  const feed = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchBabyFeeds = async (id) => {
    loading.value = true
    try {
      const data = await fetchBabyFeedsApi(id)
      console.log('Store Data:', data) // Add this line
      feeds.value = data
    } catch (err) {
      console.error('Store Error:', err) // Add this line
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const fetchBabyFeed = async (baby_id, feed_id) => {
    loading.value = true
    try {
      const data = await fetchBabyFeedApi(baby_id, feed_id)
      feed.value = data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const logFeed = async (babyId, feedData) => {
    loading.value = true
    try {
      await logFeedApi(babyId, feedData)
      // TODO: Is this the way to go?
      // const data = await logFeedApi(babyId, feedData)
      // Assuming the API returns the updated baby object with feeds
      // baby.value = data
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const deleteFeed = async (feedId) => {
    loading.value = true
    try {
      await deleteFeedApi(feedId)
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    feeds,
    feed,
    loading,
    error,
    fetchBabyFeeds,
    fetchBabyFeed,
    logFeed,
    deleteFeed
  }
})
