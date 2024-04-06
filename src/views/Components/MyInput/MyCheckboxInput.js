import React, { memo } from "react"
import { Row } from "reactstrap"

const MyCheckboxInput = memo(({ item, handleChange }) => {
  const random = Math.random()
  console.log(item)
  return (
    <Row className="mb-3">
      <label className="col-md-3 form-check-label" htmlFor={random}>
        {item[0]}
      </label>
      <div className="col-md-9">
        <input
          type="checkbox"
          className="form-check-input"
          id={random}
          checked={!!item[1]}
          onChange={e => handleChange(e.target.checked)}
        />
      </div>
    </Row>
  )
})

MyCheckboxInput.displayName = "MyCheckboxInput"

export default MyCheckboxInput
