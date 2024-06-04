import React, { useContext, useEffect, useState } from "react"
import useCountryApi from "util/api/aCountry"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap"
import { Link, useParams } from "react-router-dom"
import MySeparator from "views/Common/MySeparator"
import useImageApi from "util/api/aImage"
import { ModalContext } from "util/providers/ModalProvider"
import useHotelApi from "util/api/aHotel"
import useRoomTemplateApi from "util/api/aRoomTemplate"
import useRoomApi from "util/api/aRoom"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { DateRangePicker } from "react-date-range"
import { addDays, addHours, addYears, format } from "date-fns"
import usePricingApi from "util/api/aPricing"
import DateRangePickerComp from "views/Components/PageComponents/Hotel/DateRangePicker/DateRangePickerComp"

const Hotel = () => {
  const [hotel, setHotel] = useState()

  const [images, setImages] = useState([])
  const [imageEmptyModel, setImageEmptyModel] = useState(null)

  const [templates, setTemplates] = useState([])
  const [templateEmptyModel, setTemplateEmptyModel] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const [rooms, setRooms] = useState([])
  const [roomEmptyModel, setRoomEmptyModel] = useState(null)

  const { id } = useParams()

  const api = useHotelApi()
  const imageApi = useImageApi()
  const roomApi = useRoomApi()
  const templateApi = useRoomTemplateApi()

  const {
    setModalEmptyModel,
    setModalTitle,
    setModalType,
    openModal,
    refresh,
    setModalIgnoredProps,
  } = useContext(ModalContext)

  const handleAddImage = () => {
    setModalEmptyModel(imageEmptyModel)
    setModalTitle(`Add Image`)
    setModalType("add")
    setModalIgnoredProps([
      "countryId",
      "regionId",
      "subRegionId",
      "cityId",
      "hotelId",
      "roomTemplateId",
      "roomId",
      "userId",
    ])

    var addData = {}
    Object.keys(imageEmptyModel).map((x, i) => {
      addData[x] = null
    })

    openModal({
      data: {
        ...addData,
        hotelId: id,
        path: "https://nikana.gr/images/2617/sinapis-studios-sarti-sithonia-3-bed-studio-1-.avif",
      },
      api: imageApi,
    })
  }

  const handleEditImage = item => {
    setModalEmptyModel(imageEmptyModel)
    setModalTitle(`Edit Image`)
    setModalType("edit")
    setModalIgnoredProps([
      "countryId",
      "regionId",
      "subRegionId",
      "cityId",
      "hotelId",
      "roomTemplateId",
      "roomId",
      "userId",
    ])

    openModal({ data: item, api: imageApi })
  }

  const handleAddTemplate = () => {
    setModalEmptyModel(templateEmptyModel)
    setModalTitle(`Add Template`)
    setModalType("add")
    setModalIgnoredProps(["summary", "descripition", "hotelId", "status"])

    var addData = {}
    Object.keys(templateEmptyModel).map((x, i) => {
      addData[x] = null
    })

    openModal({ data: { ...addData, hotelId: id }, api: templateApi })
  }

  const handleTemplateDetailsClick = template => {
    window.open(`/room-template/${template.id}`)
  }

  const handleRoomDetailsClick = room => {
    window.open(`/room/${room.id}`)
  }

  const handleDeleteTemplate = id => {
    setModalTitle(`Delete Template`)
    setModalType("delete")
    openModal({ data: id, api: templateApi })
  }

  const handleAddRoom = () => {
    setModalEmptyModel(roomEmptyModel)
    setModalTitle(`Add Room`)
    setModalType("add")
    setModalIgnoredProps(["status", "hotelId", "roomTemplateId"])

    var addData = {}
    Object.keys(roomEmptyModel).map((x, i) => {
      addData[x] = null
    })

    openModal({
      data: { ...addData, hotelId: id, roomTemplateId: selectedTemplate },
      api: roomApi,
    })
  }

  const handleDeleteRoom = id => {
    setModalTitle(`Delete Room`)
    setModalType("delete")
    openModal({ data: id, api: roomApi })
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
    imageApi.getAll({ hotelId: id, sortBy: "DisplayIndex" }).then(res => {
      setImageEmptyModel(res.emptyModel)
      setImages(res.list)
    })
    templateApi.getAll({ hotelId: id, sortBy: "DisplayIndex" }).then(res => {
      setTemplateEmptyModel(res.emptyModel)
      setTemplates(res.list)
    })
    roomApi.getAll({ hotelId: id, sortBy: "DisplayIndex" }).then(res => {
      setRoomEmptyModel(res.emptyModel)
      setRooms(res.list)
    })
  }, [refresh])

  return (
    !!hotel && (
      <React.Fragment>
        <div className="page-content" style={{ overflow: "auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>{hotel.name}</h1>
            <button className="btn btn-primary btn-md" onClick={handleAddImage}>
              Add Image
            </button>
          </div>

          <MySeparator />

          <div>
            {images.length > 0 ? (
              <Slider {...settings}>
                {images.map((x, i) => (
                  <div key={i} style={{ opacity: "0" }}>
                    <img
                      src={x.path}
                      style={{
                        borderRadius: 10,
                        height: "25vh",
                        aspectRatio: "auto",
                        marginRight: 10,
                        cursor: "pointer",
                      }}
                      onClick={() => handleEditImage(x)}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <div>
                <div
                  style={{
                    height: "25vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: "#a6b0cf",
                    borderWidth: 2,
                    borderStyle: "dashed",
                    borderRadius: 10,
                    cursor: "pointer",
                  }}
                  onClick={handleAddImage}
                >
                  <i className="bx bx-image-add" style={{ fontSize: 50 }} />
                </div>
              </div>
            )}
          </div>

          <MySeparator gap={20} />

          <Card style={{ borderRadius: 10 }}>
            <CardBody>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <text style={{ color: "white" }}>
                  General reservation configuration
                </text>
              </div>

              <MySeparator gap={20} />

              <div>
                <DateRangePickerComp hotelId={id} months={2} simple selectMax />

                {/* <button onClick={savePricing}>Save</button> */}
              </div>
            </CardBody>
          </Card>

          <Card style={{ borderRadius: 10 }}>
            <CardBody>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <text style={{ color: "white" }}>Configure room types</text>

                <MySeparator gap={20} ver={false} />

                <button
                  className="btn btn-primary btn-md"
                  onClick={handleAddTemplate}
                >
                  Add Type
                </button>
              </div>

              <MySeparator gap={20} />

              {templates.length > 0 ? (
                <Slider {...settings}>
                  {templates.map((x, xi) => (
                    <div key={xi}>
                      <div
                        style={{
                          minWidth: 250,
                          borderRadius: 10,
                          backgroundColor: "#222736",
                          padding: 15,
                          display: "flex",
                          flexDirection: "column",
                          rowGap: 10,
                          marginRight: 10,
                        }}
                      >
                        <div style={{ color: "white" }}>
                          <h5>{x.name}</h5>
                          <div>
                            {"Adults"}: {x.adultCount}
                          </div>
                          <div>
                            {"Children"}: {x.childCount}
                          </div>
                          <div>
                            {"Active"}: {x.active ? x.active.toString() : false}
                          </div>
                        </div>

                        <div>
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
                          <MySeparator />
                          <button
                            style={{ width: "100%" }}
                            className={`btn ${
                              selectedTemplate == x.id
                                ? "btn-primary"
                                : "btn-light"
                            } btn-sm`}
                            onClick={() => setSelectedTemplate(x.id)}
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                <div>
                  <div
                    style={{
                      height: "20vh",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderColor: "#a6b0cf",
                      borderWidth: 2,
                      borderStyle: "dashed",
                      borderRadius: 10,
                      cursor: "pointer",
                    }}
                    onClick={handleAddTemplate}
                  >
                    <i className="bx bx-image-add" style={{ fontSize: 50 }} />
                  </div>
                </div>
              )}
            </CardBody>
          </Card>

          {templates.length > 0 && selectedTemplate && (
            <Card style={{ borderRadius: 10 }}>
              <CardBody>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <text style={{ color: "white" }}>Configure rooms</text>

                  <MySeparator gap={20} ver={false} />

                  <button
                    className="btn btn-primary btn-md"
                    onClick={handleAddRoom}
                  >
                    Add Room
                  </button>
                </div>

                <MySeparator gap={20} />

                {rooms.length > 0 ? (
                  <Slider {...settings}>
                    {rooms
                      .filter(x => x.roomTemplateId == selectedTemplate)
                      .map((x, xi) => (
                        <div key={xi}>
                          <div
                            style={{
                              minWidth: 250,
                              borderRadius: 10,
                              backgroundColor: "#222736",
                              padding: 15,
                              display: "flex",
                              flexDirection: "column",
                              rowGap: 10,
                              marginRight: 10,
                            }}
                          >
                            <div style={{ color: "white" }}>
                              <h5>{x.roomTag ?? `Room ${xi}`}</h5>
                              <div>
                                {"Status"}: {x.status}
                              </div>
                              <div>
                                {"Active"}:{" "}
                                {x.active ? x.active.toString() : false}
                              </div>
                            </div>

                            <div style={{ display: "flex" }}>
                              <button
                                style={{ width: "50%" }}
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteRoom(x.id)}
                              >
                                Remove
                              </button>
                              <MySeparator ver={false} />
                              <button
                                style={{ width: "50%" }}
                                className="btn btn-primary btn-sm"
                                onClick={() => handleRoomDetailsClick(x)}
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </Slider>
                ) : (
                  <div>
                    <div
                      style={{
                        height: "20vh",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: "#a6b0cf",
                        borderWidth: 2,
                        borderStyle: "dashed",
                        borderRadius: 10,
                        cursor: "pointer",
                      }}
                      onClick={handleAddRoom}
                    >
                      <i className="bx bx-image-add" style={{ fontSize: 50 }} />
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          )}
        </div>
      </React.Fragment>
    )
  )
}

export default Hotel
