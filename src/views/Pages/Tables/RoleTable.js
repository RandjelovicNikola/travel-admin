import React from "react"
import MyTable from "../../Components/MyTable/MyTable"
import useRoleApi from "util/api/aRole"

const RoleTable = ({ additionalActions = [], selected }) => {
  const api = useRoleApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable
          title={"Role"}
          api={api}
          actions={["Edit", "Delete", ...additionalActions]}
          selected={selected}
        />
      </div>
    </React.Fragment>
  )
}

export default RoleTable
