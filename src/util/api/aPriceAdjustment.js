import { useApi } from "./base/aBase"

export default function usePriceAdjustmentApi() {
  const api = useApi("PriceAdjustment")

  return { ...api }
}
