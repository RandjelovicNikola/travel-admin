import { useApi } from "./base/aBase"

export default function useCountryApi() {
  const api = useApi("country")

  return { ...api }
}
