import React from "react"
import MyTable from "../Components/MyTable"
import useRoomFeatureApi from "util/api/aRoomFeature"

const RoomFeatureTable = () => {
  const api = useRoomFeatureApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable title={"RoomFeature"} api={api} actions={["Edit", "Delete"]} />
      </div>
    </React.Fragment>
  )
}

export default RoomFeatureTable