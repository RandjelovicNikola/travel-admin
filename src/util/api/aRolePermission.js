import { useApi } from "./base/aBase"
import { axiosBase } from "./base/aBase"

export default function useRolePermissionApi() {
  const api = useApi("RolePermission")

  async function togglePermission(data) {
    try {
      const response = await axiosBase.post(
        "RolePermission/toggle-permission",
        data
      )
      return response.data
    } catch (err) {
      throw err
    }
  }

  return { ...api, togglePermission }
}
