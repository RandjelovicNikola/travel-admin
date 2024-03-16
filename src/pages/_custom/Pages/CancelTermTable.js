import React from "react"
import MyTable from "../Components/MyTable"
import useCancelTermApi from "util/api/aCancelTerm"

const CancelTermTable = () => {
  const api = useCancelTermApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable title={"CancelTerm"} api={api} actions={["Edit", "Delete"]} />
      </div>
    </React.Fragment>
  )
}

export default CancelTermTable