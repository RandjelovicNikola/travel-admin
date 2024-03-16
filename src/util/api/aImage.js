import { useApi } from "./base/aBase"

export default function useImageApi() {
  const api = useApi("Image")

  return { ...api }
}
