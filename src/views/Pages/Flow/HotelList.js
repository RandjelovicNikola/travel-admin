import React from "react"
import { useLocation } from "react-router-dom"
import MySeparator from "views/Common/MySeparator"

const HotelList = () => {
  const location = useLocation()
  const { hotels } = location.state || {}

  const handleNavigateToHotel = id => {
    window.open(`/hotel/${id}`)
  }

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

          <MySeparator gap={50} />

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
                      marginRight: 10,
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

export default HotelList
