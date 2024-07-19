import axios from 'axios'
import { API_URL } from '../config'

export const fetchBabyWeights = async (id) => {
  const response = await axios.get(`${API_URL}/babies/${id}/weights`)
  return response.data
}

export const fetchBabyWeight = async (baby_id, weight_id) => {
  const response = await axios.get(`${API_URL}/babies/${baby_id}/weights/${weight_id}`)
  return response.data
}
