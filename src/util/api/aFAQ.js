import { useApi } from "./base/aBase"

export default function useFAQApi() {
  const api = useApi("FAQ")

  return { ...api }
}