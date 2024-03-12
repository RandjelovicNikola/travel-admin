import { useApi } from "./base/aBase"

export default function useBlogPostApi() {
  const api = useApi("BlogPost")

  return { ...api }
}