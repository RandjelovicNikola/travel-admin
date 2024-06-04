import React, { createContext, useEffect, useState } from "react"
import useHotelApi from "util/api/aHotel"
import { convertToBase64 } from "util/tools/tTransform"

export const CreateHotelContext = createContext()

export const CreateHotelProvider = ({ children }) => {
  const [hotelName, setHotelName] = useState("")
  const [address, setAddress] = useState("")
  const [cityId, setCityId] = useState()

  const [hotelImages, setHotelImages] = useState([])

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const [roomTypeName, setRoomTypeName] = useState("")
  const [roomTypeRoomCount, setRoomTypeRoomCount] = useState()
  const [roomTypeAdults, setRoomTypeAdults] = useState()
  const [roomTypeKids, setRoomTypeKids] = useState()

  const [roomTypePrice, setRoomTypePrice] = useState("")
  const [roomTypeAlterPrices, setRoomTypeAlterPrices] = useState([])

  const api = useHotelApi()
  const handleSave = () => {
    let alterPrices = Object.entries(roomTypeAlterPrices).map(
      ([adultCount, discountPercentage]) => ({ adultCount, discountPercentage })
    )

    api.createWithDetails({
      hotelName,
      hotelImages,
      startDate,
      endDate,
      roomTypeName,
      roomTypeRoomCount,
      roomTypeAdults,
      roomTypeKids,
      roomTypePrice,
      alterPrices,
      address,
      cityId,
    })
  }

  console.log("--------------")
  console.log(hotelName)
  console.log(hotelImages)
  console.log(startDate)
  console.log(endDate)
  console.log(roomTypeName)
  console.log(roomTypeRoomCount)
  console.log(roomTypeAdults)
  console.log(roomTypeKids)
  console.log(roomTypePrice)
  console.log(roomTypeAlterPrices)
  console.log(cityId)
  console.log(address)
  console.log("--------------")

  return (
    <CreateHotelContext.Provider
      value={{
        hotelName,
        setHotelName,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        roomTypeName,
        setRoomTypeName,
        roomTypeRoomCount,
        setRoomTypeRoomCount,
        roomTypePrice,
        setRoomTypePrice,
        roomTypeAdults,
        setRoomTypeAdults,
        roomTypeKids,
        setRoomTypeKids,
        roomTypeAlterPrices,
        setRoomTypeAlterPrices,
        hotelImages,
        setHotelImages,
        handleSave,
        address,
        setAddress,
        cityId,
        setCityId,
      }}
    >
      {children}
    </CreateHotelContext.Provider>
  )
}
