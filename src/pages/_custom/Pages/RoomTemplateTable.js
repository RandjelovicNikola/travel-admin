import React from "react"
import MyTable from "../Components/MyTable"
import useRoomTemplateApi from "util/api/aRoomTemplate"

const RoomTemplateTable = () => {
  const api = useRoomTemplateApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable title={"RoomTemplate"} api={api} actions={["Edit", "Delete"]} />
      </div>
    </React.Fragment>
  )
}

export default RoomTemplateTable