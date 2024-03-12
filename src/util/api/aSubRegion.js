import { useApi } from "./base/aBase"

export default function useSubRegionApi() {
  const api = useApi("SubRegion")

  return { ...api }
}