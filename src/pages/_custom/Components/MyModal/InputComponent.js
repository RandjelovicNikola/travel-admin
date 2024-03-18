import React, { useContext, useCallback, memo } from "react"
import { Row } from "reactstrap"
import { ModalContext } from "util/providers/ModalProvider"

const InputComponent = memo(({ item, handleInputChange }) => {
  const { modalEmptyModel } = useContext(ModalContext)

  const handleChange = useCallback(
    value => {
      handleInputChange({
        key: item[0],
        value,
      })
    },
    [item, handleInputChange]
  )

  switch (modalEmptyModel[item[0]]) {
    case "string":
      return <MyModalTextInput item={item} handleChange={handleChange} />
    case "int32":
      return <MyModalNumberInput item={item} handleChange={handleChange} />
    case "boolean":
      return <MyModalBooleanInput item={item} handleChange={handleChange} />
    default:
      return null
  }
})

const MyModalTextInput = memo(({ item, handleChange }) => (
  <Row className="mb-3">
    <label className="col-md-2 col-form-label">{item[0]}</label>
    <div className="col-md-10">
      <input
        className="form-control"
        type="text"
        value={item[1]}
        onChange={e => handleChange(e.target.value)}
      />
    </div>
  </Row>
))

const MyModalNumberInput = memo(({ item, handleChange }) => (
  <Row className="mb-3">
    <label className="col-md-2 col-form-label">{item[0]}</label>
    <div className="col-md-10">
      <input
        disabled={item[0] === "id"}
        className="form-control"
        type="number"
        value={item[1]}
        onChange={e => handleChange(e.target.value)}
      />
    </div>
  </Row>
))

const MyModalBooleanInput = memo(({ item, handleChange }) => {
  console.log(item)
  return (
    <Row className="mb-3">
      <div className="form-check form-check-info mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id={`customCheck_${item[0]}`}
          checked={!!item[1]}
          onChange={e => handleChange(e.target.checked)}
        />
        <label className="form-check-label" htmlFor={`customCheck_${item[0]}`}>
          {item[0]}
        </label>
      </div>
    </Row>
  )
})

InputComponent.displayName = "InputComponent"
MyModalTextInput.displayName = "MyModalTextInput"
MyModalNumberInput.displayName = "MyModalNumberInput"
MyModalBooleanInput.displayName = "MyModalBooleanInput"

export default InputComponent
