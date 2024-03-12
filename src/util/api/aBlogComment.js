import { useApi } from "./base/aBase"

export default function useBlogCommentApi() {
  const api = useApi("BlogComment")

  return { ...api }
}