import { useSettingApi } from "../api/aSetting";

export function useSettingService() {
  const settingApi = useSettingApi();

  return { ...settingApi };
}
