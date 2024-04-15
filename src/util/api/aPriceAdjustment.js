import { useApi, axiosBase } from "./base/aBase"

export default function usePriceAdjustmentApi() {
  const api = useApi("PriceAdjustment")

  async function save(data) {
    try {
      const response = await axiosBase.post("PriceAdjustment/save", data)
      return response.data
    } catch (err) {
      throw err
    }
  }

  async function custom_remove(data) {
    try {
      const response = await axiosBase.post("PriceAdjustment/delete", data)
      return response.data
    } catch (err) {
      throw err
    }
  }

  return { ...api, save, custom_remove }
}
