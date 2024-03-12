import { useApi } from "./base/aBase"

export default function useCancelTermApi() {
  const api = useApi("CancelTerm")

  return { ...api }
}