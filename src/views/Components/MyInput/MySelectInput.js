import React, { memo } from "react"
import { Row } from "reactstrap"

const MySelectInput = memo(
  ({ item, data, handleFilterData, handleChange, expand, inModal }) => {
    return (
      <Row className={`mb-3 ${inModal ? "col-md-12" : "col-md-3"}`}>
        {!expand && (
          <label className="col-md-3 col-form-label">{item[0]}</label>
        )}

        <div className={!expand ? "col-md-9" : "col-md-12"}>
          {handleFilterData && (
            <input
              type={"text"}
              onChange={e => handleFilterData(e.target.value.split(" - ")[1])}
            />
          )}
          <select
            className={"form-select"}
            onChange={e => {
              var val = e.target.value.split(" ")[0]
              handleChange(!isNaN(val) ? parseInt(val) : val)
            }}
          >
            <option>None</option>
            {(!!data &&
              data.map((x, i) => (
                <option key={i}>
                  {x.id} - {x.name}
                </option>
              ))) || <option>No items</option>}
          </select>
        </div>
      </Row>
    )
  }
)

MySelectInput.displayName = "MySelectInput"

export default MySelectInput
