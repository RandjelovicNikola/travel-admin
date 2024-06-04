import NonAuthLayout from "components/NonAuthLayout"
import React, { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import useHotelApi from "util/api/aHotel"
import { UserContext } from "util/providers/UserProvider"
import CreateHotel from "./CreateHotel"

const FlowIndex = ({ route, Layout }) => {
  const [firstTime, setFirstTime] = useState(null)

  const api = useHotelApi()
  const { user } = useContext(UserContext)

  useEffect(() => {
    api.getAll({ userId: user.id }).then(res => {
      setFirstTime(res?.count == 0)
    })
  }, [])

  if (firstTime != null) {
    if (firstTime)
      return (
        <NonAuthLayout>
          <CreateHotel />
        </NonAuthLayout>
      )
    else return <Layout>{route.component}</Layout>
  }
}

export default FlowIndex
