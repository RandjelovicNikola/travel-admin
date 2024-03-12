import { useApi } from "./base/aBase"

export default function useRoomFeatureCategoryApi() {
  const api = useApi("RoomFeatureCategory")

  return { ...api }
}