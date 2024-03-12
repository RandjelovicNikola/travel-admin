import { useApi } from "./base/aBase"

export default function useCityApi() {
  const api = useApi("City")

  return { ...api }
}