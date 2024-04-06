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
import RoomFeaturesComp from "views/Components/PageComponents/RoomFeaturesComp"

const Room = () => {
  const { id } = useParams()
  const [room, setRoom] = useState()

  const [images, setImages] = useState([])
  const [imageEmptyModel, setImageEmptyModel] = useState(null)

  const [features, setFeatures] = useState(null)
  const [featureCategories, setFeatureCategories] = useState(null)
  const [roomFeatureConnection, setRoomFeatureConnection] = useState(null)

  const [localRefresh, setLocalRefresh] = useState(false)

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
        path: "https://nikana.gr/images/3225/althea-luxury-houses-ag-nikitas-lefkada-15.avif",
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

          <RoomFeaturesComp
            connectionType={1}
            templateId={room.roomTemplateId}
            roomId={id}
          />
        </div>
      </React.Fragment>
    )
  )
}

export default Room
