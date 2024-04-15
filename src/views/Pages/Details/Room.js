import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Slider from "react-slick"
import { Card, CardBody } from "reactstrap"
import useImageApi from "util/api/aImage"
import useRoomApi from "util/api/aRoom"
import useRoomFeatureApi from "util/api/aRoomFeature"
import useRoomFeatureCategoryApi from "util/api/aRoomFeatureCategory"
import useRoomFeatureRoomApi from "util/api/aRoomFeatureRoom"
import useRoomTemplateApi from "util/api/aRoomTemplate"
import { ModalContext } from "util/providers/ModalProvider"
import MySeparator from "views/Common/MySeparator"
import PriceAdjComp from "views/Components/PageComponents/PriceAdjComp"
import RoomFeaturesComp from "views/Components/PageComponents/RoomFeaturesComp"

const Room = () => {
  const { id } = useParams()
  const [room, setRoom] = useState()
  const [template, setTemplate] = useState()

  const [images, setImages] = useState([])
  const [imageEmptyModel, setImageEmptyModel] = useState(null)

  const api = useRoomApi()
  const templateApi = useRoomTemplateApi()
  const imageApi = useImageApi()

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
    api.getById(id).then(room => {
      setRoom(room)

      templateApi
        .getById(room.roomTemplateId)
        .then(template => setTemplate(template))
    })
    imageApi.getAll({ roomId: id, sortBy: "DisplayIndex" }).then(res => {
      setImageEmptyModel(res.emptyModel)
      setImages(res.list)
    })
  }, [refresh])

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

          {template && (
            <PriceAdjComp roomId={id} adultCount={template.adultCount} />
          )}

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
