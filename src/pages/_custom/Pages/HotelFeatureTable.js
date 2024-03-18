import React from "react"
import MyTable from "../Components/MyTable/MyTable"
import useHotelFeatureApi from "util/api/aHotelFeature"

const HotelFeatureTable = () => {
  const api = useHotelFeatureApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable
          title={"HotelFeature"}
          api={api}
          actions={["Edit", "Delete"]}
        />
      </div>
    </React.Fragment>
  )
}

export default HotelFeatureTable
