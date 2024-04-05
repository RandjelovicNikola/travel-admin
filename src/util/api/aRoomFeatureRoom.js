import { axiosBase, useApi } from "./base/aBase"

export default function useRoomFeatureRoomApi() {
  const api = useApi("RoomFeatureRoom")

  async function toggleFeature(data) {
    try {
      const response = await axiosBase.post(
        "RoomFeatureRoom/toggle-feature",
        data
      )
      return response.data
    } catch (err) {
      throw err
    }
  }

  return { ...api, toggleFeature }
}
