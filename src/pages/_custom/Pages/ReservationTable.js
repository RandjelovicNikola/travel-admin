import React from "react"
import MyTable from "../Components/MyTable"
import useReservationApi from "util/api/aReservation"

const ReservationTable = () => {
  const api = useReservationApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable title={"Reservation"} api={api} actions={["Edit", "Delete"]} />
      </div>
    </React.Fragment>
  )
}

export default ReservationTable