import { useApi } from "./base/aBase"

export default function useRecensionApi() {
  const api = useApi("Recension")

  return { ...api }
}