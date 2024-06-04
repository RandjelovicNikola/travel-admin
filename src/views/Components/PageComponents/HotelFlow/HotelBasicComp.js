import React, { useContext, useState } from "react"
import { Button, Card, CardBody, CardTitle, Container } from "reactstrap"
import { CreateHotelContext } from "util/providers/CreateHotelProvider"
import MySeparator from "views/Common/MySeparator"

function HotelBasicComp({ stepper }) {
  const [error, setError] = useState("")

  const { hotelName, setHotelName } = useContext(CreateHotelContext)

  const handleForward = () => {
    if (hotelName) stepper.next()
    else setError("Invalid Unit name")
  }

  return (
    <Card>
      <CardBody>
        <CardTitle>Welcome to Start Travel!</CardTitle>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <text>
            Let's begin the journey by creating your first Rental Unit
          </text>

          <MySeparator gap={30} />

          {error && (
            <>
              <text style={{ color: "red" }}>{error}</text>
              <MySeparator gap={5} />
            </>
          )}

          <text style={{ fontWeight: 700 }}>
            1. Enter the name of your Unit:{" "}
          </text>
          <MySeparator gap={10} />

          <input
            className="form-control form-control"
            type="text"
            value={hotelName}
            onChange={e => setHotelName(e.target.value)}
          ></input>

          <MySeparator gap={30} />

          <button
            style={{ flex: 1 }}
            className="btn btn-primary btn-md"
            onClick={handleForward}
          >
            Continue
          </button>
        </div>
      </CardBody>
    </Card>
  )
}

export default HotelBasicComp
