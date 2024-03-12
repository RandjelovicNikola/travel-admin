import { useApi } from "./base/aBase"

export default function useReservationApi() {
  const api = useApi("Reservation")

  return { ...api }
}