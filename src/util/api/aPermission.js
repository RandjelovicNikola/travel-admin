import { useApi } from "./base/aBase"

export default function usePermissionApi() {
  const api = useApi("Permission")

  return { ...api }
}