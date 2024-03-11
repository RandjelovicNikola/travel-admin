import { useRoleApi } from "../api/aRole";

export function useRoleService() {
  const roleApi = useRoleApi();

  return { ...roleApi };
}
