import { useApi } from "./base/aBase"

export default function useHotelApi() {
  const api = useApi("Hotel")

  return { ...api }
}