import { axiosBase, useApi } from "./base/aBase"

export default function useRoomFeatureRoomTemplateApi() {
  const api = useApi("RoomFeatureRoomTemplate")

  async function toggleFeature(data) {
    try {
      const response = await axiosBase.post(
        "RoomFeatureRoomTemplate/toggle-feature",
        data
      )
      return response.data
    } catch (err) {
      throw err
    }
  }

  return { ...api, toggleFeature }
}
