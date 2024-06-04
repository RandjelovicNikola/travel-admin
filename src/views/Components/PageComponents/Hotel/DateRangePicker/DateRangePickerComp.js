import { addDays, addHours, addYears, format } from "date-fns"
import React, { useEffect, useState } from "react"
import { DateRange, DateRangePicker } from "react-date-range"
import usePricingApi from "util/api/aPricing"
import "./DateRangePicker.scss"

const DateRangePickerComp = ({
  hotelId,
  months,
  onChange,
  selectMax,
  simple,
}) => {
  const [calState, setCalState] = useState([
    {
      startDate: addHours(new Date().toISOString(), 2),
      endDate: !selectMax
        ? addHours(addDays(new Date().toISOString(), 7), 2)
        : addHours(addYears(new Date().toISOString(), 2), 2),
      key: "selection",
    },
  ])

  const [pricings, setPricings] = useState([])
  const [pricingEmptyModel, setPricingEmptyModel] = useState([])

  const [refresh, setRefresh] = useState(false)

  const pricingApi = usePricingApi()

  const savePricing = () => {
    pricingApi
      .create({
        hotelId,
        price: 50,
        startDate: calState[0].startDate,
        endDate: calState[0].endDate,
      })
      .then(res => {
        setRefresh(!refresh)
      })
  }

  const handleUpdate = data => {
    setCalState(data)
    if (onChange) onChange(data)
  }

  const dateOverlay = data => {
    var current = new Date(data)
    var isOpen = pricings.some(
      x => current >= new Date(x.startDate) && current <= new Date(x.endDate)
    )

    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 15,
          fontWeight: "600",
        }}
      >
        <span>{format(current, "d")}</span>
      </div>
    )
  }

  useEffect(() => {
    if (hotelId)
      pricingApi
        .getAll({ hotelId, sortBy: "DisplayIndex", pageSize: 1000 })
        .then(res => {
          setPricingEmptyModel(res.emptyModel)
          setPricings(res.list)
        })

    if (onChange) onChange(calState)
  }, [refresh])

  if (!simple) {
    return (
      <div>
        <DateRangePicker
          style={{ width: "calc(100%)" }}
          onChange={item => handleUpdate([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={months}
          ranges={calState}
          direction="horizontal"
          minDate={new Date()}
          maxDate={addYears(new Date(), 2)}
          dayContentRenderer={dateOverlay}
          fixedHeight={true}
        />
      </div>
    )
  } else {
    return (
      <div>
        <DateRange
          style={{ width: "calc(100%)" }}
          onChange={item => handleUpdate([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={months}
          ranges={calState}
          direction="horizontal"
          minDate={new Date()}
          maxDate={addYears(new Date(), 2)}
          dayContentRenderer={dateOverlay}
          fixedHeight={true}
        />
      </div>
    )
  }
}

export default DateRangePickerComp
