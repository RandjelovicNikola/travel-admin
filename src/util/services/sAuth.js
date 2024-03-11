import { useAuthApi } from "../api/aAuth";

export function useAuthService() {
  const authApi = useAuthApi();

  return { ...authApi };
}
