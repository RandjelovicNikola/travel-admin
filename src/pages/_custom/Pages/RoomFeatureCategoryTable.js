import React from "react"
import MyTable from "../Components/MyTable/MyTable"
import useRoomFeatureCategoryApi from "util/api/aRoomFeatureCategory"

const RoomFeatureCategoryTable = () => {
  const api = useRoomFeatureCategoryApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable
          title={"RoomFeatureCategory"}
          api={api}
          actions={["Edit", "Delete"]}
        />
      </div>
    </React.Fragment>
  )
}

export default RoomFeatureCategoryTable
