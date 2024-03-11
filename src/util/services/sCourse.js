import { useCourseApi } from "../api/aCourse";

export function useCourseService() {
  const courseApi = useCourseApi();

  return { ...courseApi };
}
