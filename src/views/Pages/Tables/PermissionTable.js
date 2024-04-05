import React from "react"
import MyTable from "../../Components/MyTable/MyTable"
import usePermissionApi from "util/api/aPermission"

const PermissionTable = ({ additionalActions = [], selected }) => {
  const api = usePermissionApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable
          title={"Permission"}
          api={api}
          actions={["Edit", "Delete", ...additionalActions]}
          selected={selected}
        />
      </div>
    </React.Fragment>
  )
}

export default PermissionTable
