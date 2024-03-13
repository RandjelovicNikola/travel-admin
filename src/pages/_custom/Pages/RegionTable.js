import React from "react"
import MyTable from "../Components/MyTable"
import useRegionApi from "util/api/aRegion"

const RegionTable = () => {
  const api = useRegionApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable title={"Region"} api={api} />
      </div>
    </React.Fragment>
  )
}

export default RegionTable
