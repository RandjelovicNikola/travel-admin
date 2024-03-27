import React, { memo } from "react"
import { format } from "date-fns"
import { FormGroup, InputGroup, Label, Row } from "reactstrap"
import Flatpickr from "react-flatpickr"

const MyDateInput = memo(({ item, handleChange, range, expand }) => {
  return (
    <Row className="mb-3">
      {!expand && <label className="col-md-3 col-form-label">{item[0]}</label>}
      <div className={!expand ? "col-md-9" : "col-md-12"}>
        <InputGroup>
          <Flatpickr
            className="form-control d-block"
            placeholder={expand ? item[0] : ""}
            options={{
              mode: range ? "range" : "single",
              dateFormat: "Y-m-d",
            }}
            value={item[1]}
            onChange={e => handleChange(format(e[0], "yyyy-MM-dd"))}
          />
        </InputGroup>
      </div>
    </Row>
  )
})

MyDateInput.displayName = "MyDateInput"

export default MyDateInput
