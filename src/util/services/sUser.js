import { useUserApi } from "../api/aUser";

export function useUserService() {
  const userApi = useUserApi();

  return { ...userApi };
}
