import { useApi } from "./base/aBase"

export default function useRoomTemplateApi() {
  const api = useApi("RoomTemplate")

  return { ...api }
}