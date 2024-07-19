import axios from 'axios'
import { API_URL } from '../config'

export const fetchBabyFeeds = async (id) => {
  const response = await axios.get(`${API_URL}/babies/${id}/feeds`)
  return response.data
}

export const fetchBabyFeed = async (baby_id, feed_id) => {
  const response = await axios.get(`${API_URL}/babies/${baby_id}/feeds/${feed_id}`)
  return response.data
}

export const logFeed = async (babyId, feedData) => {
  const response = await axios.post(`${API_URL}/babies/${babyId}/feeds`, feedData)
  return response.data
}

// Todo: Implement deleteFeed with new api endpoint
export const deleteFeed = async (feedId) => {
  const response = await axios.delete(`${API_URL}/feeds/${feedId}`)
  return response.data
}
