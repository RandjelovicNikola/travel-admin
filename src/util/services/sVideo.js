import { useVideoApi } from "../api/aVideo";

export function useVideoService() {
  const videoApi = useVideoApi();

  return { ...videoApi };
}
