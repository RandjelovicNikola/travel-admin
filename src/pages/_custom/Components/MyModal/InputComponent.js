import React, {
  useContext,
  useCallback,
  memo,
  useState,
  useEffect,
} from "react"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap"
import { useApi } from "util/api/base/aBase"
import { ModalContext } from "util/providers/ModalProvider"
import { toCapitalized } from "util/tools/tDisplay"

const InputComponent = memo(({ item, emptyModel, handleInputChange }) => {
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
        return <MyModalTextInput item={item} handleChange={handleChange} />
      case "boolean":
        return <MyModalBooleanInput item={item} handleChange={handleChange} />
      case "int16":
      case "int32":
      case "int64":
      case "double":
      case "float":
      case "decimal":
        return <MyModalNumberInput item={item} handleChange={handleChange} />
      default:
        null
    }
  }
})

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
  })

  return (
    <Row className="mb-3">
      <Dropdown isOpen={open} toggle={() => setOpen(!open)}>
        <label className="col-md-3 col-form-label">
          {toCapitalized(controller)}
        </label>
        <DropdownToggle className="btn btn-secondary" caret>
          {selected ?? toCapitalized(controller)}{" "}
          <i className="mdi mdi-chevron-down" />
        </DropdownToggle>

        <DropdownMenu style={{ zIndex: 999999 }}>
          {(!!data &&
            data.map((x, i) => (
              <DropdownItem key={i} onClick={() => handleChangeLocal(x)}>
                {x.id} - {x.name}
              </DropdownItem>
            ))) || <DropdownItem>No items</DropdownItem>}
        </DropdownMenu>
      </Dropdown>
    </Row>
  )
})

const MyModalTextInput = memo(({ item, handleChange }) => (
  <Row className="mb-3">
    {/* <label className="col-md-2 col-form-label">{item[0]}</label> */}
    <div className="col-md-12">
      <input
        className="form-control"
        type="text"
        value={item[1]}
        onChange={e => handleChange(e.target.value)}
        placeholder={item[0]}
      />
    </div>
  </Row>
))

const MyModalNumberInput = memo(({ item, handleChange }) => (
  <Row className="mb-3">
    {/* <label className="col-md-2 col-form-label">{item[0]}</label> */}
    <div className="col-md-12">
      <input
        disabled={item[0] === "id"}
        className="form-control"
        type="number"
        value={item[1]}
        onChange={e => handleChange(e.target.value)}
        placeholder={item[0]}
      />
    </div>
  </Row>
))

const MyModalBooleanInput = memo(({ item, handleChange }) => {
  const random = Math.random()
  return (
    <Row className="mb-3">
      <div className="form-check form-check-info mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id={random}
          checked={!!item[1]}
          onChange={e => handleChange(e.target.checked)}
        />
        <label className="form-check-label" htmlFor={random}>
          {item[0]}
        </label>
      </div>
    </Row>
  )
})

InputComponent.displayName = "InputComponent"
MyModalSelectInput.displayName = "MyModalSelectInput"
MyModalTextInput.displayName = "MyModalTextInput"
MyModalNumberInput.displayName = "MyModalNumberInput"
MyModalBooleanInput.displayName = "MyModalBooleanInput"

export default InputComponent
