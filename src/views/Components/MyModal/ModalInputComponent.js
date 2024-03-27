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
          value: item[0] != value ? value : null,
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

const MyModalSelectInput = memo(({ controller, handleChange, enumName }) => {
  const [data, setData] = useState(null)

  const api = useApi(!enumName ? controller : "common/enum")

  const handleChangeLocal = val => {
    if (val) {
      var id = val.slice(
        val.indexOf("(") + 1,
        val.indexOf(")", val.indexOf("("))
      )

      handleChange(id)
    }
  }

  useEffect(() => {
    api
      .getAll(!enumName ? {} : { name: enumName })
      .then(res => setData(res.list))
  }, [])

  return (
    <Row className="mb-3">
      <label className="col-md-3 col-form-label">{controller}</label>

      <div className="col-md-9">
        <select
          className={"form-select"}
          onChange={e => handleChangeLocal(e.target.value)}
        >
          {(!!data &&
            data.map((x, i) => (
              <option key={i}>
                {x.name} ({x.id})
              </option>
            ))) || <option>No items</option>}
        </select>
      </div>
    </Row>
  )
})

ModalInputComponent.displayName = "ModalInputComponent"
MyModalSelectInput.displayName = "MyModalSelectInput"

export default ModalInputComponent
