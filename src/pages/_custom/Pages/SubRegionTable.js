import React from "react"
import MyTable from "../Components/MyTable/MyTable"
import useSubRegionApi from "util/api/aSubRegion"

const SubRegionTable = () => {
  const api = useSubRegionApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable title={"SubRegion"} api={api} actions={["Edit", "Delete"]} />
      </div>
    </React.Fragment>
  )
}

export default SubRegionTable
