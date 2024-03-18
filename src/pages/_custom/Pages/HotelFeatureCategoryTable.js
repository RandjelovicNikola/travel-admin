import React from "react"
import MyTable from "../Components/MyTable/MyTable"
import useHotelFeatureCategoryApi from "util/api/aHotelFeatureCategory"

const HotelFeatureCategoryTable = () => {
  const api = useHotelFeatureCategoryApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable
          title={"HotelFeatureCategory"}
          api={api}
          actions={["Edit", "Delete"]}
        />
      </div>
    </React.Fragment>
  )
}

export default HotelFeatureCategoryTable
