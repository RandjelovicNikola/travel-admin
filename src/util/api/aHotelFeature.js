import { useApi } from "./base/aBase"

export default function useHotelFeatureApi() {
  const api = useApi("HotelFeature")

  return { ...api }
}