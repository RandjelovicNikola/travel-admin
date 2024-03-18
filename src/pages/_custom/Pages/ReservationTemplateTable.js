import React from "react"
import MyTable from "../Components/MyTable/MyTable"
import useReservationTemplateApi from "util/api/aReservationTemplate"

const ReservationTemplateTable = () => {
  const api = useReservationTemplateApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable
          title={"ReservationTemplate"}
          api={api}
          actions={["Edit", "Delete"]}
        />
      </div>
    </React.Fragment>
  )
}

export default ReservationTemplateTable
