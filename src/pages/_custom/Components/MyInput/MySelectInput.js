import React, { memo } from "react"
import { Row } from "reactstrap"

const MySelectInput = memo(({ data, handleFilterData, handleChange }) => {
  return (
    <Row className="mb-3">
      <label className="col-md-3 col-form-label">{controller}</label>

      <div className="col-md-9">
        {handleFilterData && (
          <input
            type={"text"}
            onChange={e => handleFilterData(e.target.value)}
          ></input>
        )}
        <select className={"form-select"}>
          {(!!data &&
            data.map((x, i) => (
              <option key={i} onClick={() => handleChange(x.key)}>
                {x.key} - {x.value}
              </option>
            ))) || <option>No items</option>}
        </select>
      </div>
    </Row>
  )
})

MySelectInput.displayName = "MySelectInput"

export default MySelectInput
