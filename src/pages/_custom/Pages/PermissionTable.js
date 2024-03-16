import React from "react"
import MyTable from "../Components/MyTable"
import usePermissionApi from "util/api/aPermission"

const PermissionTable = () => {
  const api = usePermissionApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable title={"Permission"} api={api} actions={["Edit", "Delete"]} />
      </div>
    </React.Fragment>
  )
}

export default PermissionTable