import React, { useContext, useEffect, useState } from "react"
import { Button, Card, CardBody, CardTitle, Container } from "reactstrap"
import useCityApi from "util/api/aCity"
import { CreateHotelContext } from "util/providers/CreateHotelProvider"
import MySeparator from "views/Common/MySeparator"
import MySelectInput from "views/Components/MyInput/MySelectInput"

function HotelAddressComp({ stepper }) {
  const [error, setError] = useState("")
  const [cities, setCities] = useState("")

  const { address, setAddress, cityId, setCityId } =
    useContext(CreateHotelContext)

  const api = useCityApi()

  const handleForward = () => {
    if (address) stepper.next()
    else setError("Invalid Unit name")
  }

  const handleCityChange = val => {
    setCityId(val)
  }

  useEffect(() => {
    api.getAll({ dropdown: true }).then(res => {
      if (res.list) setCities(res.list)
    })
  }, [])

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
            2. Enter the address of your Unit:{" "}
          </text>
          <MySeparator gap={10} />

          <MySelectInput
            name={"City"}
            item={["City"]}
            data={cities}
            handleChange={handleCityChange}
            disabled={false}
            inModal
          />

          <label>Address</label>
          <input
            className="form-control form-control"
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
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

export default HotelAddressComp
