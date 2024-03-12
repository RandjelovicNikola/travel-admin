import { useApi } from "./base/aBase"

export default function useRoleApi() {
  const api = useApi("Role")

  return { ...api }
}