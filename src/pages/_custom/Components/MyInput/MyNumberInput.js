import React, { memo } from "react"
import { Row } from "reactstrap"

const MyNumberInput = memo(
  ({ item, handleChange, expand, disabled, inModal }) => (
    <Row className={`mb-3 ${inModal ? "col-md-12" : "col-md-3"}`}>
      {!expand && <label className="col-md-3 col-form-label">{item[0]}</label>}
      <div className={expand ? "col-md-12" : "col-md-9"}>
        <input
          disabled={disabled}
          className="form-control"
          type="number"
          value={item[1]}
          onChange={e => handleChange(e.target.value)}
          placeholder={expand ? item[0] : undefined}
        />
      </div>
    </Row>
  )
)

MyNumberInput.displayName = "MyNumberInput"

export default MyNumberInput
