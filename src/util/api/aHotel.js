import { axiosBase, useApi } from "./base/aBase"

export default function useHotelApi() {
  const api = useApi("Hotel")

  async function createWithDetails(data) {
    axiosBase.post("Hotel/create-with-details", data)
  }

  return { ...api, createWithDetails }
}
