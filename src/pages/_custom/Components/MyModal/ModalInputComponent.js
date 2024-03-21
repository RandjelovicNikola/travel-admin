import React, { useCallback, memo, useState, useEffect } from "react"
import { Row } from "reactstrap"
import { useApi } from "util/api/base/aBase"
import MyTextInput from "../MyInput/MyTextInput"
import MyNumberInput from "../MyInput/MyNumberInput"
import MyCheckboxInput from "../MyInput/MyCheckboxInput"

const ModalInputComponent = memo(
  ({ item, emptyModel, handleInputChange, isInModal }) => {
    const handleChange = useCallback(
      value => {
        handleInputChange({
          key: item[0],
          value,
        })
      },
      [item, handleInputChange]
    )

    if (item[0].endsWith("Id")) {
      return (
        <MyModalSelectInput
          controller={item[0].slice(0, -2)}
          handleChange={handleChange}
        />
      )
    } else {
      switch (emptyModel[item[0]]) {
        case "string":
          return <MyTextInput item={item} handleChange={handleChange} />
        case "boolean":
          return <MyCheckboxInput item={item} handleChange={handleChange} />
        case "int16":
        case "int32":
        case "int64":
        case "double":
        case "float":
        case "decimal":
          return <MyNumberInput item={item} handleChange={handleChange} />
        default:
          null
      }
    }
  }
)

const MyModalSelectInput = memo(({ controller, handleChange }) => {
  const [data, setData] = useState(null)
  const [selected, setSelected] = useState()
  const [open, setOpen] = useState(false)

  const api = useApi(controller)

  const handleChangeLocal = item => {
    setSelected(item.name)
    handleChange(item.id)
  }

  useEffect(() => {
    api.getAll().then(res => setData(res.list))
  }, [])

  return (
    <Row className="mb-3">
      <label className="col-md-3 col-form-label">{controller}</label>

      <div className="col-md-9">
        <select className={"form-select"}>
          {(!!data &&
            data.map((x, i) => (
              <option key={i} onClick={() => handleChangeLocal(x)}>
                {x.id} - {x.name}
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
