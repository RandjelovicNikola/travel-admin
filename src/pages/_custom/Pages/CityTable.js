import React from "react"
import MyTable from "../Components/MyTable/MyTable"
import useCityApi from "util/api/aCity"

const CityTable = () => {
  const api = useCityApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable title={"City"} api={api} actions={["Edit", "Delete"]} />
      </div>
    </React.Fragment>
  )
}

export default CityTable
