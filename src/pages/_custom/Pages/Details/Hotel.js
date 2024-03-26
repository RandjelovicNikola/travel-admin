import React, { useContext, useEffect, useState } from "react"
import useCountryApi from "util/api/aCountry"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap"
import { Link, useParams } from "react-router-dom"
import MySeparator from "../../Common/MySeparator"
import useImageApi from "util/api/aImage"
import { ModalContext } from "util/providers/ModalProvider"
import useHotelApi from "util/api/aHotel"
import useRoomTemplateApi from "util/api/aRoomTemplate"

const Hotel = () => {
  const [hotel, setHotel] = useState()

  const [images, setImages] = useState([{}])
  const [imageEmptyModel, setImageEmptyModel] = useState(null)

  const [templates, setTemplates] = useState([{}])
  const [templateEmptyModel, setTemplateEmptyModel] = useState(null)

  const { id } = useParams()

  const api = useHotelApi()
  const imageApi = useImageApi()
  const templateApi = useRoomTemplateApi()

  const {
    setModalEmptyModel,
    setModalTitle,
    setModalType,
    openModal,
    refresh,
  } = useContext(ModalContext)

  const handleAddImage = () => {
    setModalEmptyModel(imageEmptyModel)
    setModalTitle(`Add Image`)
    setModalType("add")

    var addData = {}
    Object.keys(imageEmptyModel).map((x, i) => {
      addData[x] = null
    })

    openModal({ data: { ...addData, hotelId: id }, api: imageApi })
  }

  const handleAddTemplate = () => {
    setModalEmptyModel(templateEmptyModel)
    setModalTitle(`Add Image`)
    setModalType("add")

    var addData = {}
    Object.keys(templateEmptyModel).map((x, i) => {
      addData[x] = null
    })

    openModal({ data: { ...addData, hotelId: id }, api: templateApi })
  }

  const handleTemplateDetailsClick = template => {
    window.open(`/room-template/${template.id}`)
  }

  const handleDeleteTemplate = id => {
    setModalType("delete")
    openModal({ data: id, api: templateApi })
  }

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: true,
  }

  useEffect(() => {
    api.getById(id).then(res => setHotel(res))
    imageApi.getAll({ hotelId: id }).then(res => {
      setImageEmptyModel(res.emptyModel)
      setImages(res.list)
    })
    templateApi.getAll({ hotelId: id }).then(res => {
      setTemplateEmptyModel(res.emptyModel)
      setTemplates(res.list)
    })
  }, [refresh])

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
            <button className="btn btn-primary btn-md" onClick={handleAddImage}>
              Add Image
            </button>
          </div>

          <MySeparator />

          <div style={{ height: 350 }}>
            <Slider {...settings}>
              {images.map((x, i) => (
                <div key={i}>
                  <img
                    src={x.path}
                    style={{
                      borderRadius: "10px",
                      height: 350,
                      aspectRatio: "auto",
                      marginRight: 10,
                    }}
                  />
                </div>
              ))}
            </Slider>
          </div>

          <MySeparator />

          <Card style={{ borderRadius: 10 }}>
            <CardBody>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CardTitle className="mt-0">Room Templates</CardTitle>
                <button
                  className="btn btn-primary btn-md"
                  onClick={handleAddTemplate}
                >
                  Add Template
                </button>
              </div>

              <MySeparator />

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  columnGap: 10,
                }}
              >
                {!!templates &&
                  templates.map((x, xi) => (
                    <div
                      key={xi}
                      style={{
                        width: "calc(25% - 7.5px)",
                        aspectRatio: 1 / 1,
                        borderRadius: 10,
                        backgroundColor: "#222736",
                        padding: 20,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        marginTop: 10,
                      }}
                    >
                      <div>
                        <h5>{x.name}</h5>
                        <div>
                          {"Adults"}: {x.adultCount}
                        </div>
                        <div>
                          {"Children"}: {x.childCount}
                        </div>
                        <div>
                          {"Separate rooms"}: {x.roomCount}
                        </div>
                        <div>
                          {"Active"}: {x.active ? x.active.toString() : false}
                        </div>
                      </div>

                      <div style={{ fontSize: 15 }}>
                        Number of rooms:{" "}
                        <button style={{ width: 30 }}>
                          <i className="mdi mdi-chevron-left"></i>
                        </button>
                        <span
                          style={{
                            fontSize: 20,
                            color: "white",
                            marginInline: 10,
                          }}
                        >
                          5
                        </span>
                        <button style={{ width: 30 }}>
                          <i className="mdi mdi-chevron-right"></i>
                        </button>
                      </div>

                      <div style={{ display: "flex" }}>
                        <button
                          style={{ width: "50%" }}
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteTemplate(x.id)}
                        >
                          Remove
                        </button>
                        <MySeparator ver={false} />
                        <button
                          style={{ width: "50%" }}
                          className="btn btn-primary btn-sm"
                          onClick={() => handleTemplateDetailsClick(x)}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    )
  )
}

export default Hotel
