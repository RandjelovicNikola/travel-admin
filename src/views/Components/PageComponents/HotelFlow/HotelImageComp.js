import React, { useContext, useState } from "react"
import { Button, Card, CardBody, CardTitle, Container } from "reactstrap"
import { CreateHotelContext } from "util/providers/CreateHotelProvider"
import { convertToBase64 } from "util/tools/tTransform"
import MySeparator from "views/Common/MySeparator"

function HotelImageComp({ stepper }) {
  const [error, setError] = useState("")
  // const [previews, setPreviews] = useState([])

  const { hotelImages, setHotelImages } = useContext(CreateHotelContext)

  const handleForward = () => {
    if (hotelImages.length > 0) stepper.next()
    else setError("No images selected")
  }

  const handleChange = async e => {
    let files = []

    for (let i = 0; i < e.target.files.length; i++) {
      await convertToBase64(e.target.files[i]).then(res => files.push(res))
    }
    // const files = Array.from(e.target.files, async image =>
    //   convertToBase64(image)
    // )

    setHotelImages(files)

    // const filePreviews = Array.from(e.target.files).map(file => URL.createObjectURL(file))
    // setPreviews(filePreviews)
  }

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle>Welcome to Start Travel!</CardTitle>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <text>
              Let's begin the journey by creating your first Rental Unit
            </text>

            <MySeparator gap={30} />

            {error && (
              <>
                <text style={{ color: "red" }}>{error}</text>
                <MySeparator gap={5} />
              </>
            )}

            <text style={{ fontWeight: 700 }}>
              3. Add images of your Unit:{" "}
              <text style={{ textDecorationLine: "underline" }}>
                {hotelImages.length} selected
              </text>
            </text>
            <MySeparator gap={10} />

            <div className="col-md-9">
              <input
                type="file"
                multiple
                onChange={handleChange}
                accept="image/jpeg, image/jpg, image/png, image/gif"
              />
            </div>

            <MySeparator gap={30} />

            <div style={{ display: "flex" }}>
              <button
                style={{ flex: 1 }}
                className="btn btn-outline-light btn-md"
                onClick={() => stepper.back()}
              >
                Back
              </button>
              <MySeparator ver={false} />
              <button
                style={{ flex: 1 }}
                className="btn btn-primary btn-md"
                onClick={handleForward}
              >
                Continue
              </button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default HotelImageComp
