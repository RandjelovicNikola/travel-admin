import React, { useContext, useState } from "react"
import { Button, Card, CardBody, CardTitle, Container } from "reactstrap"
import { CreateHotelContext } from "util/providers/CreateHotelProvider"
import MySeparator from "views/Common/MySeparator"

function HotelPriceComp({ stepper }) {
  const [error, setError] = useState("")

  const {
    roomTypePrice,
    setRoomTypePrice,
    roomTypeAdults,
    roomTypeAlterPrices,
    setRoomTypeAlterPrices,
  } = useContext(CreateHotelContext)

  const handleForward = () => {
    if (!roomTypePrice || roomTypePrice == 0) setError("Invalid base price")
    else stepper.next()
  }

  return (
    <div
      style={{
        maxHeight: 700,
        overflowY: `${roomTypeAdults > 5 ? "scroll" : undefined}`,
      }}
    >
      <Card>
        <CardBody>
          <CardTitle>Welcome to Start Travel!</CardTitle>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <text>
              Let's begin the journey by creating your first Rental Unit
            </text>

            <MySeparator gap={30} />

            <text style={{ fontWeight: 700 }}>
              5. What's the base price of a room of this type:
            </text>
            <MySeparator gap={20} />

            {error && (
              <>
                <text style={{ color: "red" }}>{error}</text>
                <MySeparator gap={5} />
              </>
            )}

            <label>Base price per Night</label>
            <input
              className="form-control form-control"
              type="number"
              value={roomTypePrice}
              onChange={e => setRoomTypePrice(parseInt(e.target.value))}
            ></input>

            <MySeparator gap={30} />

            {roomTypeAdults && roomTypeAdults > 1 && (
              <>
                <text style={{ fontWeight: 700 }}>
                  6. Would you like to offer discount if less than{" "}
                  {roomTypeAdults} people want to make a reservation?
                </text>
                <MySeparator />
                {Array.from({ length: roomTypeAdults - 1 }, (_, i) => i + 1)
                  .reverse()
                  .map((x, key) => (
                    <div key={key}>
                      <MySeparator />
                      <label>
                        If there {x > 1 ? "are" : "is"} only {x} adult
                        {x > 1 ? "s" : ""}
                      </label>
                      <input
                        className="form-control form-control"
                        type="number"
                        value={roomTypeAlterPrices[`${x}`]}
                        onChange={e =>
                          setRoomTypeAlterPrices(cur => ({
                            ...cur,
                            [x]: parseInt(e.target.value),
                          }))
                        }
                        placeholder="%"
                      ></input>
                    </div>
                  ))}
                <MySeparator gap={20} />
              </>
            )}

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
    </div>
  )
}

export default HotelPriceComp
