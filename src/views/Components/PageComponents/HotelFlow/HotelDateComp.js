import React, { useContext, useState } from "react"
import { Button, Card, CardBody, CardTitle, Container } from "reactstrap"
import { CreateHotelContext } from "util/providers/CreateHotelProvider"
import MySeparator from "views/Common/MySeparator"
import DateRangePickerComp from "../Hotel/DateRangePicker/DateRangePickerComp"

function HotelDateComp({ stepper }) {
  const [error, setError] = useState("")

  const { startDate, setStartDate, endDate, setEndDate, handleSave } =
    useContext(CreateHotelContext)

  const handleSaveLocal = () => {
    if (!startDate) setError("Invalid rental start date")
    else if (!endDate) setError("Invalid rental end date")
    else handleSave()

    setTimeout(() => {
      stepper.next()
    }, 1000)
  }

  const handleUpdate = e => {
    if (e[0].startDate) setStartDate(e[0].startDate)
    if (e[0].endDate) setEndDate(e[0].endDate)
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
            7. Choose the timeframe to accept reservations:
            <br />
            (the maximum of 2 years ahead has been pre-selected)
          </text>
          <MySeparator gap={10} />

          <DateRangePickerComp
            months={1}
            onChange={handleUpdate}
            simple
            selectMax
          />

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
              onClick={handleSaveLocal}
            >
              Save
            </button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default HotelDateComp
