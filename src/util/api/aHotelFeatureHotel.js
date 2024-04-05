import { useApi } from "./base/aBase"

export default function useHotelFeatureHotelApi() {
  const api = useApi("HotelFeatureHotel")

  return { ...api }
}
