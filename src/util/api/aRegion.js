import { useApi } from "./base/aBase"

export default function useRegionApi() {
  const api = useApi("Region")

  return { ...api }
}