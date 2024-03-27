import React from "react"
import MyTable from "../../Components/MyTable/MyTable"
import useRecensionApi from "util/api/aRecension"

const RecensionTable = () => {
  const api = useRecensionApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable title={"Recension"} api={api} actions={["Edit", "Delete"]} />
      </div>
    </React.Fragment>
  )
}

export default RecensionTable
