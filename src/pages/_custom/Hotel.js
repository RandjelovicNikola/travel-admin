import React, { useEffect, useState } from "react"
import useCountryApi from "util/api/aCountry"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Separator from "./Common/Separator"
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"

const Hotel = id => {
  const [hotel, setHotel] = useState()

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
  }

  useEffect(() => {
    setHotel({
      img: "https://nikana.gr/images/2617/sinapis-studios-sarti-sithonia-3-bed-studio-1-.avif",
      name: "Sinapsis",
      lastName: "Studios",
    })
  }, [])

  return (
    !!hotel && (
      <React.Fragment>
        <div className="page-content">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h5>
              {hotel.name} {hotel.lastName}
            </h5>
            <button className="btn btn-primary btn-md">Add</button>
          </div>

          <Separator />

          <div style={{ width: "auto" }}>
            <Slider {...settings}>
              {Array(15)
                .fill(null)
                .map((x, i) => (
                  <div key={i}>
                    <img
                      src={hotel.img}
                      style={{
                        borderRadius: "10px",
                        width: "98%",
                      }}
                    />
                  </div>
                ))}
            </Slider>
          </div>

          <Card>
            <CardImg
              top
              className="img-fluid"
              src={hotel.img}
              alt="Skote"
              style={{ width: 100 }}
            />
            <CardBody>
              <CardTitle className="mt-0">Card title</CardTitle>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card&apos;s content.
              </CardText>
              <Link to="#" className="btn btn-primary">
                Button
              </Link>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    )
  )
}

export default Hotel
