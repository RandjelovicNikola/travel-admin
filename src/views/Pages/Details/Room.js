import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Slider from "react-slick"
import { Card, CardBody } from "reactstrap"
import useImageApi from "util/api/aImage"
import useRoomApi from "util/api/aRoom"
import useRoomFeatureApi from "util/api/aRoomFeature"
import useRoomFeatureCategoryApi from "util/api/aRoomFeatureCategory"
import useRoomFeatureRoomApi from "util/api/aRoomFeatureRoom"
import { ModalContext } from "util/providers/ModalProvider"
import MySeparator from "views/Common/MySeparator"

const Room = () => {
  const [room, setRoom] = useState()

  const [images, setImages] = useState([])
  const [imageEmptyModel, setImageEmptyModel] = useState(null)

  const [features, setFeatures] = useState(null)
  const [featureCategories, setFeatureCategories] = useState(null)
  const [roomFeatureConnection, setRoomFeatureConnection] = useState(null)

  const [localRefresh, setLocalRefresh] = useState(false)

  const { id } = useParams()

  const api = useRoomApi()
  const imageApi = useImageApi()
  const featureApi = useRoomFeatureApi()
  const featureCategoryApi = useRoomFeatureCategoryApi()
  const roomFeatureConnectionApi = useRoomFeatureRoomApi()

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
        hotelId: room?.hotelId,
        roomTemplateId: room?.roomTemplateId,
        roomId: id,
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
      "roomId",
      "userId",
    ])

    openModal({ data: item, api: imageApi })
  }

  const toggleFeature = feature => {
    roomFeatureConnectionApi
      .toggleFeature({ roomId: id, roomFeatureId: feature.id })
      .then(() => setLocalRefresh(!localRefresh))
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
    api.getById(id).then(res => setRoom(res))
    imageApi.getAll({ roomId: id, sortBy: "DisplayIndex" }).then(res => {
      setImageEmptyModel(res.emptyModel)
      setImages(res.list)
    })
    featureApi.getAll({ pageSize: 1000 }).then(res => {
      setFeatures(res.list)
    })
    featureCategoryApi.getAll({ pageSize: 1000 }).then(res => {
      setFeatureCategories(res.list)
    })
    roomFeatureConnectionApi
      .getAll({ pageSize: 1000, roomId: id })
      .then(res => {
        setRoomFeatureConnection(res.list)
      })
  }, [refresh, localRefresh])

  return (
    !!room && (
      <React.Fragment>
        <div className="page-content" style={{ overflow: "auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>{room.roomTag}</h1>
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
                <h5 style={{ color: "white" }}>
                  What does this specific room offer?
                </h5>
              </div>

              <MySeparator gap={20} />

              {featureCategories &&
                featureCategories.map((x, i) => (
                  <div key={i} style={{ height: "100%", width: "100" }}>
                    {x.name}

                    <MySeparator />

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        columnGap: 10,
                      }}
                    >
                      {features &&
                        roomFeatureConnection &&
                        features
                          .filter(y => y.roomFeatureCategoryId == x.id)
                          .map((y, i) => (
                            <div
                              key={i}
                              style={{
                                height: 30,
                                width: 200,
                                display: "flex",
                                alignItems: "center",
                                color: "white",
                              }}
                            >
                              <div className="form-check form-switch form-switch-md mb-3">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`customSwitchsizemd_${i}_${y.id}`}
                                  checked={roomFeatureConnection?.some(
                                    z => z.roomFeatureId == y.id
                                  )}
                                  onClick={() => toggleFeature(y)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`customSwitchsizemd_${i}_${y.id}`}
                                >
                                  {y.name}
                                </label>
                              </div>
                            </div>
                          ))}
                    </div>

                    <MySeparator gap={30} />
                  </div>
                ))}
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    )
  )
}

export default Room
