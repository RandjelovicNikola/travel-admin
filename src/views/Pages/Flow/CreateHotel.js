import React, { useContext, useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CreateHotelContext } from "util/providers/CreateHotelProvider"
import HotelAddressComp from "views/Components/PageComponents/HotelFlow/HotelAddressComp"
import HotelBasicComp from "views/Components/PageComponents/HotelFlow/HotelBasicComp"
import HotelDateComp from "views/Components/PageComponents/HotelFlow/HotelDateComp"
import HotelImageComp from "views/Components/PageComponents/HotelFlow/HotelImageComp"
import HotelPriceComp from "views/Components/PageComponents/HotelFlow/HotelPriceComp"
import HotelRoomsComp from "views/Components/PageComponents/HotelFlow/HotelRoomsComp"

const CreateHotel = () => {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  const stepper = () => {
    const next = () => {
      setStep(cur => cur + 1)
    }
    const back = () => {
      setStep(cur => cur - 1)
    }
    return { next, back }
  }

  const handleRefresh = () => {
    setRefresh(prev => !prev)
    stepper().next()
  }

  return (
    <>
      <div
        style={{
          height: 70,
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          marginRight: 50,
        }}
      >
        <a className="btn btn-primary btn-md" href="/logout">
          Sign out
        </a>
      </div>
      <div
        style={{
          height: "calc(100vh - 70px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: 450, marginTop: -70 }}>
          {step == 0 ? (
            <HotelBasicComp stepper={stepper()} />
          ) : step == 1 ? (
            <HotelAddressComp stepper={stepper()} />
          ) : step == 2 ? (
            <HotelImageComp stepper={stepper()} />
          ) : step == 3 ? (
            <HotelRoomsComp stepper={stepper()} />
          ) : step == 4 ? (
            <HotelPriceComp stepper={stepper()} />
          ) : step == 5 ? (
            <HotelDateComp stepper={stepper()} />
          ) : (
            <>{navigate("/")}</>
          )}
        </div>
      </div>
    </>
  )
}

export default CreateHotel
