import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useHotelApi from "util/api/aHotel"
import { UserContext } from "util/providers/UserProvider"
import MySeparator from "views/Common/MySeparator"

const MainPage = () => {
  const [hotels, setHotels] = useState(null)

  const api = useHotelApi()
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const handleCreateHotel = () => {
    api.create({ name: "My new hotel", userId: user.id }).then(res => {
      if (res) {
        navigate(`/hotel/${res.id}`)
      }
    })
  }

  const handleNavigateToHotel = id => {
    window.open(`/hotel/${id}`)
  }

  useEffect(() => {
    api.getAll({ userId: user.id, pageSize: 20 }).then(res => {
      if (res?.list?.length > 0) setHotels(res.list)
      console.log(res.list)
    })
  }, [])

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

          <MySeparator gap={15} />

          <button
            className={"btn btn-primary btn-lg"}
            onClick={handleCreateHotel}
          >
            Create a hotel
          </button>

          <MySeparator gap={25} />

          {hotels && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                overflow: "auto",
              }}
            >
              {hotels.map((x, i) => (
                <div
                  key={i}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleNavigateToHotel(x.id)}
                >
                  <img
                    src={x.image?.path}
                    style={{
                      borderRadius: "10px",
                      aspectRatio: "auto",
                      marginTop: 10,
                    }}
                    height={"105vh"}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default MainPage
