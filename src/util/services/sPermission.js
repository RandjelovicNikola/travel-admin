import { usePermissionApi } from "../api/aPermission";

export function usePermissionService() {
  const permissionApi = usePermissionApi();

  return { ...permissionApi };
}
