import React, { memo } from "react"
import { Row } from "reactstrap"
import { convertToBase64 } from "util/tools/tTransform"

const MyBase64Input = memo(({ item, handleChange }) => {
  const handleChangeOverride = async e => {
    var file = e.target.files[0]
    var base64string = await convertToBase64(file)

    handleChange(base64string)
  }

  return (
    <Row className="mb-3">
      <label className="col-md-3 form-check-label">{item[0]}</label>
      <div className="col-md-9">
        <input type="file" onChange={handleChangeOverride} />
      </div>
    </Row>
  )
})

MyBase64Input.displayName = "MyBase64Input"

export default MyBase64Input
