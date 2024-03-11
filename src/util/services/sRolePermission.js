import { useRolePermissionApi } from "../api/aRolePermission";

export function useRolePermissionService() {
  const rolePermissionApi = useRolePermissionApi();

  return { ...rolePermissionApi };
}
