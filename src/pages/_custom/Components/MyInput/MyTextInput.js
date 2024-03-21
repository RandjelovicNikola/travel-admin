import React, { memo } from "react"
import { Row } from "reactstrap"

const MyTextInput = memo(({ item, handleChange, expand }) => {
  return (
    <Row className="mb-3">
      {!expand && <label className="col-md-3 col-form-label">{item[0]}</label>}
      <div className={expand ? "col-md-12" : "col-md-9"}>
        <input
          className="form-control"
          type="text"
          value={item[1]}
          onChange={e => handleChange(e.target.value)}
          placeholder={expand && item[0]}
        />
      </div>
    </Row>
  )
})

MyTextInput.displayName = "MyTextInput"

export default MyTextInput
