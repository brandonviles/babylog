// src/api/babiesApi.js
import axios from 'axios'
import { API_URL } from '../config'

export const fetchBabies = async () => {
  const response = await axios.get(`${API_URL}/babies`)
  return response.data
}

export const fetchBaby = async (id) => {
  const response = await axios.get(`${API_URL}/babies/${id}`)
  return response.data
}

// Todo: Implement deleteFeed with new api endpoint
export const deleteFeed = async (feedId) => {
  const response = await axios.delete(`${API_URL}/feeds/${feedId}`)
  return response.data
}
