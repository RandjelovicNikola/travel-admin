import { axiosBase } from "./base/aBase"

export default function useCommonApi() {
  async function getEnum(name) {
    try {
      const response = await axiosBase.get("common/enum")
      return response.data
    } catch (err) {
      throw err
    }
  }

  return { getEnum }
}
