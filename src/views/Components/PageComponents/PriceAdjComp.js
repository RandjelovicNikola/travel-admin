import React, { useEffect, useState } from "react"
import { Card, CardBody } from "reactstrap"
import usePriceAdjustmentApi from "util/api/aPriceAdjustment"
import MySeparator from "views/Common/MySeparator"
import MyNumberInput from "../MyInput/MyNumberInput"

const PriceAdjComp = ({ templateId, roomId, adultCount }) => {
  const isForRoom = !!roomId

  const [currentAdjustmentValues, setCurrentAdjustmentValues] = useState([])
  const [refresh, setRefresh] = useState(false)

  const api = usePriceAdjustmentApi()

  const handleChangePriceAdj = (item, val) => {
    setCurrentAdjustmentValues(currentData => {
      const newData = currentData.map(entry => {
        if (entry.adultCount === item) {
          return { ...entry, discountPercentage: val }
        }
        return entry
      })

      if (!newData.some(entry => entry.adultCount === adultCount)) {
        newData.push({
          adultCount: item,
          discountPercentage: val,
        })
      }

      return newData
    })
  }

  const handleCreatePriceAdj = (item, val) => {
    if (isForRoom)
      api.save({ roomId: roomId, adultCount: item, discountPercentage: val })
    else
      api.save({
        roomTemplateId: templateId,
        adultCount: item,
        discountPercentage: val,
      })
  }

  const handleRemovePriceAdj = (item, val) => {
    if (isForRoom)
      api
        .custom_remove({
          roomId: roomId,
          adultCount: item,
          discountPercentage: val,
        })
        .then(() => setRefresh(!refresh))
    else
      api
        .custom_remove({
          roomTemplateId: templateId,
          adultCount: item,
          discountPercentage: val,
        })
        .then(() => setRefresh(!refresh))
  }

  useEffect(() => {
    if (isForRoom)
      api
        .getAll({ roomId: roomId, pageSize: 1000 })
        .then(res => setCurrentAdjustmentValues(res.list))
    else
      api
        .getAll({ roomTemplateId: templateId, pageSize: 1000 })
        .then(res => setCurrentAdjustmentValues(res.list))
  }, [refresh])

  return (
    <div>
      <Card style={{ borderRadius: 10 }}>
        <CardBody>
          <h5 style={{ color: "white" }}>
            Do you offer better prices for less people? {"(-%)"}
          </h5>

          <MySeparator gap={20} />

          <div>
            {Array.from({ length: adultCount - 1 }, (_, i) => i + 1).map(
              (x, i) => {
                const valueObj = currentAdjustmentValues.find(
                  y => y.adultCount === x
                )
                return (
                  <div
                    key={i}
                    style={{
                      height: 50,
                      width: "70%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    Adults: {x}
                    <input
                      type="number"
                      value={valueObj ? valueObj.discountPercentage : ""}
                      onChange={e => handleChangePriceAdj(x, e.target.value)}
                      placeholder={"Unset"}
                    />
                    <button
                      onClick={() =>
                        handleCreatePriceAdj(
                          x,
                          currentAdjustmentValues.filter(
                            y => y.adultCount == x
                          )[0]?.discountPercentage
                        )
                      }
                    >
                      save
                    </button>
                    <button
                      onClick={() =>
                        handleRemovePriceAdj(
                          x,
                          currentAdjustmentValues.filter(
                            y => y.adultCount == x
                          )[0]?.discountPercentage
                        )
                      }
                    >
                      remove
                    </button>
                  </div>
                )
              }
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default PriceAdjComp
