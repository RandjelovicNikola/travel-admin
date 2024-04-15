import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Slider from "react-slick"
import useImageApi from "util/api/aImage"
import useRoomFeatureApi from "util/api/aRoomFeature"
import useRoomFeatureCategoryApi from "util/api/aRoomFeatureCategory"
import useRoomFeatureRoomTemplateApi from "util/api/aRoomFeatureRoomTemplate"
import useRoomTemplateApi from "util/api/aRoomTemplate"
import { ModalContext } from "util/providers/ModalProvider"
import MySeparator from "views/Common/MySeparator"
import PriceAdjComp from "views/Components/PageComponents/PriceAdjComp"
import RoomFeaturesComp from "views/Components/PageComponents/RoomFeaturesComp"

const RoomTemplate = () => {
  const { id } = useParams()
  const [template, setTemplate] = useState()
  const [priceAdjustments, setPriceAdjustments] = useState([])

  const [images, setImages] = useState([])
  const [imageEmptyModel, setImageEmptyModel] = useState(null)

  const [features, setFeatures] = useState(null)
  const [featureCategories, setFeatureCategories] = useState(null)
  const [roomTemplateFeatureConnection, setRoomTemplateFeatureConnection] =
    useState(null)

  const [localRefresh, setLocalRefresh] = useState(false)

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
        path: "https://nikana.gr/images/3225/althea-luxury-houses-ag-nikitas-lefkada-13.avif",
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
      "roomTemplateId",
    ])

    openModal({ data: item, api: imageApi })
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

          <PriceAdjComp templateId={id} adultCount={template.adultCount} />

          <RoomFeaturesComp templateId={id} />
        </div>
      </React.Fragment>
    )
  )
}

export default RoomTemplate
