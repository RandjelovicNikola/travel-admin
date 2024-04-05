import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useHotelApi from "util/api/aHotel"
import { UserContext } from "util/providers/UserProvider"
import MySeparator from "views/Common/MySeparator"

const MainPage = () => {
  const api = useHotelApi()
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const handleCheckIfHasHotel = () => {
    api.getAll({ userId: user.id, pageSize: 20 }).then(res => {
      if (res?.list?.length == 1) navigate(`/hotel/${res.list[0].id}`)
      else if (res?.list?.length > 1)
        navigate(`/hotel-list`, { state: { hotels: res.list } })
    })
  }

  const handleCreateHotel = () => {
    api.create({ name: "My new hotel", userId: user.id }).then(res => {
      if (res) {
        navigate(`/hotel/${res.id}`)
      }
    })
  }

  useEffect(() => {
    if (user) handleCheckIfHasHotel()
  }, [user])

  return (
    <React.Fragment>
      <div className="page-content">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <h1
            style={{
              fontSize: 40,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Welcome to Start Travel
          </h1>

          <MySeparator gap={25} />

          <button
            className={"btn btn-primary btn-lg"}
            onClick={handleCreateHotel}
          >
            Create your first hotel
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default MainPage
