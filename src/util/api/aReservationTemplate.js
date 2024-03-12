import { useApi } from "./base/aBase"

export default function useReservationTemplateApi() {
  const api = useApi("ReservationTemplate")

  return { ...api }
}