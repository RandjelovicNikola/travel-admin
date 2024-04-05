import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Slider from "react-slick"
import { Card, CardBody } from "reactstrap"
import useImageApi from "util/api/aImage"
import useRoomFeatureApi from "util/api/aRoomFeature"
import useRoomFeatureCategoryApi from "util/api/aRoomFeatureCategory"
import useRoomFeatureRoomTemplateApi from "util/api/aRoomFeatureRoomTemplate"
import useRoomTemplateApi from "util/api/aRoomTemplate"
import { ModalContext } from "util/providers/ModalProvider"
import MySeparator from "views/Common/MySeparator"
import MyNumberInput from "views/Components/MyInput/MyNumberInput"

const RoomTemplate = () => {
  const [template, setTemplate] = useState()
  const [priceAdjustments, setPriceAdjustments] = useState([])

  const [images, setImages] = useState([])
  const [imageEmptyModel, setImageEmptyModel] = useState(null)

  const [features, setFeatures] = useState(null)
  const [featureCategories, setFeatureCategories] = useState(null)
  const [roomTemplateFeatureConnection, setRoomTemplateFeatureConnection] =
    useState(null)

  const [localRefresh, setLocalRefresh] = useState(false)

  const { id } = useParams()

  const api = useRoomTemplateApi()
  const imageApi = useImageApi()
  const featureApi = useRoomFeatureApi()
  const featureCategoryApi = useRoomFeatureCategoryApi()
  const roomTemplateFeatureConnectionApi = useRoomFeatureRoomTemplateApi()

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
        hotelId: template?.hotelId,
        roomTemplateId: id,
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
    roomTemplateFeatureConnectionApi
      .toggleFeature({ roomTemplateId: id, roomFeatureId: feature.id })
      .then(() => setLocalRefresh(!localRefresh))
  }

  const handleChangePriceAdj = ({ innerArrayIndex, item, val }) => {
    setPriceAdjustments(currentData =>
      currentData.map((innerArray, index) =>
        index === innerArrayIndex
          ? innerArray.map(price =>
              price[0] === item ? { ...price, value: val } : price
            )
          : innerArray
      )
    )
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
    api.getById(id).then(res => {
      setTemplate(res)
      setPriceAdjustments(
        Array.from({ length: res.adultCount }, (x, i) => [
          `Adults: ${i + 1}`,
          0,
        ])
      )
    })
    imageApi
      .getAll({ roomTemplateId: id, sortBy: "DisplayIndex" })
      .then(res => {
        setImageEmptyModel(res.emptyModel)
        setImages(res.list)
      })
    featureApi.getAll({ pageSize: 1000 }).then(res => {
      setFeatures(res.list)
    })
    featureCategoryApi.getAll({ pageSize: 1000 }).then(res => {
      setFeatureCategories(res.list)
    })
    roomTemplateFeatureConnectionApi
      .getAll({ pageSize: 1000, roomTemplateId: id })
      .then(res => {
        setRoomTemplateFeatureConnection(res.list)
      })
  }, [refresh, localRefresh])

  return (
    !!template && (
      <React.Fragment>
        <div className="page-content" style={{ overflow: "auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>{template.name}</h1>
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

          {template && (
            <Card style={{ borderRadius: 10 }}>
              <CardBody>
                <h5 style={{ color: "white" }}>
                  Do you offer better prices for less people? {"(-%)"}
                </h5>

                <MySeparator gap={20} />

                <div>
                  {priceAdjustments &&
                    priceAdjustments
                      .sort((a, b) => b - a)
                      .map((x, i) => (
                        <div
                          key={i}
                          style={{
                            height: 50,
                            width: "70%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          <MyNumberInput
                            item={x}
                            inModal={true}
                            expand={false}
                            handleChange={e =>
                              handleChangePriceAdj({ item: x, val: e })
                            }
                          />
                        </div>
                      ))}
                </div>
              </CardBody>
            </Card>
          )}

          <Card style={{ borderRadius: 10 }}>
            <CardBody>
              <h5 style={{ color: "white" }}>
                What does this specific room offer?
              </h5>

              <MySeparator />

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
                        roomTemplateFeatureConnection &&
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
                                  checked={roomTemplateFeatureConnection?.some(
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

                    <MySeparator gap={20} />
                  </div>
                ))}
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    )
  )
}

export default RoomTemplate
