import React from "react"
import MyTable from "../../Components/MyTable/MyTable"
import useRoomApi from "util/api/aRoom"

const RoomTable = () => {
  const api = useRoomApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable title={"Room"} api={api} actions={["Edit", "Delete"]} />
      </div>
    </React.Fragment>
  )
}

export default RoomTable
