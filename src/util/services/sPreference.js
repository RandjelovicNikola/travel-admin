import { usePreferenceApi } from "../api/aPreference";

export function usePreferenceService() {
  const preferenceApi = usePreferenceApi();

  return { ...preferenceApi };
}
