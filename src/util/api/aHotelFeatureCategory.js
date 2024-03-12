import { useApi } from "./base/aBase"

export default function useHotelFeatureCategoryApi() {
  const api = useApi("HotelFeatureCategory")

  return { ...api }
}