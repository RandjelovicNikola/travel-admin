import { useBundleApi } from "../api/aBundle";

export function useBundleService() {
  const bundleApi = useBundleApi();

  return { ...bundleApi };
}
