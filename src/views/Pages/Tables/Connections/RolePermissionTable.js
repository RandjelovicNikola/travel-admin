import React, { useEffect, useState } from "react"
import RoleTable from "../RoleTable"
import PermissionTable from "../PermissionTable"
import useRolePermissionApi from "util/api/aRolePermission"

const RolePermissionTable = () => {
  const [role, setRole] = useState()
  const [rolePermissions, setRolePermissions] = useState()
  const [refresh, setRefresh] = useState(false)

  const api = useRolePermissionApi()

  const selectRole = newRole => {
    setRole(newRole.id)
  }

  const loadSelectedPermissions = () => {
    api.getAll({ roleId: role }).then(res => setRolePermissions(res.list))
  }

  const selectPermission = permission => {
    api
      .togglePermission({ roleId: role, permissionId: permission.id })
      .then(() => setRefresh(!refresh))
  }

  useEffect(() => {
    if (role) {
      loadSelectedPermissions()
    }
  }, [role, refresh])

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <RoleTable
          selected={[role]}
          additionalActions={[{ name: "Select", callback: selectRole }]}
        />
      </div>

      <div style={{ flex: 1 }}>
        <PermissionTable
          selected={
            rolePermissions ? rolePermissions.map(x => x.permissionId) : []
          }
          rolePermissions={rolePermissions}
          additionalActions={[{ name: "Select", callback: selectPermission }]}
        />
      </div>
    </div>
  )
}

export default RolePermissionTable
