import React, { useContext, useState } from "react"
import { Button, Card, CardBody, CardTitle, Container } from "reactstrap"
import { CreateHotelContext } from "util/providers/CreateHotelProvider"
import MySeparator from "views/Common/MySeparator"

function HotelRoomsComp({ stepper }) {
  const [error, setError] = useState("")

  const {
    roomTypeName,
    setRoomTypeName,
    roomTypeRoomCount,
    setRoomTypeRoomCount,
    roomTypeAdults,
    setRoomTypeAdults,
    roomTypeKids,
    setRoomTypeKids,
  } = useContext(CreateHotelContext)

  const handleForward = () => {
    if (!roomTypeName) setError("Invalid Room Type name")
    else if (!roomTypeAdults || roomTypeAdults < 1)
      setError("Invalid Room Type adults")
    else if (roomTypeAdults > 30) setError("Max adults - 30")
    else if (roomTypeKids == null) setError("Invalid Room Type kids")
    else if (!roomTypeRoomCount || roomTypeRoomCount < 1)
      setError("Invalid room count")
    else stepper.next()
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

          <text style={{ fontWeight: 700 }}>4. Create a Room Type:</text>
          <text>(You can create more later)</text>
          <MySeparator gap={20} />

          {error && (
            <>
              <text style={{ color: "red" }}>{error}</text>
              <MySeparator gap={5} />
            </>
          )}

          <label>Room type name</label>
          <input
            className="form-control form-control"
            type="text"
            value={roomTypeName}
            onChange={e => setRoomTypeName(e.target.value)}
          ></input>
          <MySeparator gap={10} />

          <label>Number of adults in a room of this type</label>
          <input
            className="form-control form-control"
            type="number"
            value={roomTypeAdults}
            onChange={e => setRoomTypeAdults(parseInt(e.target.value))}
          ></input>
          <MySeparator gap={10} />

          <label>Number of children in a room of this type</label>
          <input
            className="form-control form-control"
            type="number"
            value={roomTypeKids}
            onChange={e => setRoomTypeKids(parseInt(e.target.value))}
          ></input>
          <MySeparator gap={10} />

          <label>Number of Rooms of this type</label>
          <input
            className="form-control form-control"
            type="number"
            value={roomTypeRoomCount}
            onChange={e => setRoomTypeRoomCount(parseInt(e.target.value))}
          ></input>

          <MySeparator gap={30} />

          <div style={{ display: "flex" }}>
            <button
              style={{ flex: 1 }}
              className="btn btn-outline-light btn-md"
              onClick={() => stepper.back()}
            >
              Back
            </button>
            <MySeparator ver={false} />
            <button
              style={{ flex: 1 }}
              className="btn btn-primary btn-md"
              onClick={handleForward}
            >
              Continue
            </button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default HotelRoomsComp
