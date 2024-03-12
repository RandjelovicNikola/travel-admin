import { useApi } from "./base/aBase"

export default function useRoomApi() {
  const api = useApi("Room")

  return { ...api }
}