import { useApi } from "./base/aBase"

export default function useCountryApi() {
  const api = useApi("Country")

  return { ...api }
}
