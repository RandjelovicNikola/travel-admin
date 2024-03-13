import axios from "axios"
import config from "../../constants/config"
import { ObjectToQuery } from "../../tools/tUri"
// import * as AxiosLogger from "axios-logger";

export const axiosBase = axios.create({
  baseURL: config.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
})

export function setAxiosToken(token) {
  if (!!token) {
    axiosBase.defaults.headers.common["Authorization"] = `Bearer ${token}`
  }
}

export function useApi(controller) {
  async function getAll(data) {
    console.log(axiosBase.defaults)
    try {
      var query = ObjectToQuery(data)

      const response = await axiosBase.get(`${controller}${query}`)
      return response.data
    } catch (err) {
      throw err
    }
  }

  async function getById(id) {
    try {
      const response = await axiosBase.get(`${controller}/${id}`)
      return response.data
    } catch (err) {
      throw err
    }
  }

  async function create(data) {
    try {
      const response = await axiosBase.post(`${controller}/create`, data)
      return response.data
    } catch (err) {
      throw err
    }
  }

  async function update(id, data) {
    try {
      const response = await axiosBase.post(`${controller}/update`, data)
      return response.data
    } catch (err) {
      throw err
    }
  }

  async function remove(id) {
    try {
      const response = await axiosBase.post(`${controller}/delete/${id}`)
      return response.data
    } catch (err) {
      throw err
    }
  }

  return { getAll, getById, create, update, remove }
}
