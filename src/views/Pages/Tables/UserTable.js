import React from "react"
import MyTable from "../../Components/MyTable/MyTable"
import useUserApi from "util/api/aUser"

const UserTable = () => {
  const api = useUserApi()

  return (
    <React.Fragment>
      <div className="page-content">
        <MyTable title={"User"} api={api} actions={["Edit", "Delete"]} />
      </div>
    </React.Fragment>
  )
}

export default UserTable
