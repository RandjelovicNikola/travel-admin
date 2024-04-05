import React, { useCallback, memo, useState, useEffect } from "react"
import { Row } from "reactstrap"
import { useApi } from "util/api/base/aBase"
import MyTextInput from "../MyInput/MyTextInput"
import MyNumberInput from "../MyInput/MyNumberInput"
import MyCheckboxInput from "../MyInput/MyCheckboxInput"
import MySelectInput from "../MyInput/MySelectInput"
import Enums from "util/constants/enums"
import MyDateInput from "../MyInput/MyDateInput"

const ModalInputComponent = memo(
  ({ item, emptyModel, handleInputChange, disabled }) => {
    const [data, setData] = useState(null)
    const [isEnum, setIsEnum] = useState(emptyModel[item[0]]?.startsWith("e"))

    const handleChange = useCallback(
      value => {
        handleInputChange({
          key: item[0],
          value: value != "None" ? value : null,
        })
      },
      [item, handleInputChange]
    )

    useEffect(() => {
      if (isEnum) {
        console.log(item[0])
        setData(
          Object.entries(Enums[emptyModel[item[0]]]).map(x => ({
            id: x[0],
            name: x[1],
          }))
        )
      } else if (item[0]?.endsWith("Id")) {
        var api = useApi(item[0].slice(0, -2))

        api.getAll({ dropdown: true }).then(res => {
          setData(res.list)
        })
      }
    }, [])

    if (isEnum || item[0]?.endsWith("Id")) {
      return (
        <MySelectInput
          name={item[0]}
          item={item}
          data={data}
          handleChange={handleChange}
          disabled={disabled}
          inModal={true}
        />
      )
    } else {
      switch (emptyModel[item[0]]) {
        case "string":
          return (
            <MyTextInput
              item={item}
              handleChange={handleChange}
              disabled={disabled}
              inModal={true}
            />
          )
        case "boolean":
          return (
            <MyCheckboxInput
              item={item}
              handleChange={handleChange}
              disabled={disabled}
              inModal={true}
            />
          )
        case "int16":
        case "int32":
        case "int64":
        case "double":
        case "float":
        case "decimal":
          return (
            <MyNumberInput
              item={item}
              handleChange={handleChange}
              disabled={disabled}
              inModal={true}
            />
          )
        case "dateTime":
          return (
            <MyDateInput
              item={item}
              handleChange={handleChange}
              range={false}
              expand={false}
            />
          )
        default:
          null
      }
    }
  }
)

ModalInputComponent.displayName = "ModalInputComponent"

export default ModalInputComponent
