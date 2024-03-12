import { useApi } from "./base/aBase"

export default function usePricingApi() {
  const api = useApi("Pricing")

  return { ...api }
}