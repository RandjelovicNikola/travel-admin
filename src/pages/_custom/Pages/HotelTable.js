import React from "react"
import MyTable from "../Components/MyTable"
import useHotelApi from "util/api/aHotel"

const HotelTable = () => {
  const api = useHotelApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable title={"Hotel"} api={api} actions={["Edit", "Delete"]} />
      </div>
    </React.Fragment>
  )
}

export default HotelTable