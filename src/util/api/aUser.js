import { useApi } from "./base/aBase"

export default function useUserApi() {
  const api = useApi("User")

  return { ...api }
}
