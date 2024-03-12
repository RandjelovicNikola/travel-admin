import { useApi } from "./base/aBase"

export default function useRoomFeatureApi() {
  const api = useApi("RoomFeature")

  return { ...api }
}