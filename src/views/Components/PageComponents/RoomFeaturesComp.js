import React, { useEffect, useState } from "react"
import { Card, CardBody } from "reactstrap"
import useRoomFeatureApi from "util/api/aRoomFeature"
import useRoomFeatureCategoryApi from "util/api/aRoomFeatureCategory"
import MySeparator from "views/Common/MySeparator"
import useRoomFeatureRoomApi from "util/api/aRoomFeatureRoom"
import useRoomFeatureRoomTemplateApi from "util/api/aRoomFeatureRoomTemplate"

const RoomFeaturesComp = ({ templateId, roomId }) => {
  var isForRoom = !!roomId

  const [features, setFeatures] = useState(null)
  const [categories, setCategories] = useState(null)
  const [roomConns, setRoomConns] = useState(null)
  const [roomTemplateConns, setRoomTemplateConns] = useState(null)
  const [refresh, setRefresh] = useState()

  const featureApi = useRoomFeatureApi()
  const featureCatApi = useRoomFeatureCategoryApi()
  const roomConnectionApi = useRoomFeatureRoomApi()
  const templateConnectionApi = useRoomFeatureRoomTemplateApi()

  const toggleFeature = feature => {
    if (!isForRoom) {
      toggleForTemplate(feature.id)
    } else if (!roomTemplateConns?.some(z => z.roomFeatureId == feature.id)) {
      toggleForRoom(feature.id)
    }
  }

  const toggleForRoom = id => {
    roomConnectionApi
      .toggleFeature({
        roomId: roomId,
        roomFeatureId: id,
      })
      .then(() => setRefresh(!refresh))
  }

  const toggleForTemplate = id => {
    templateConnectionApi
      .toggleFeature({
        roomTemplateId: templateId,
        roomFeatureId: id,
      })
      .then(() => setRefresh(!refresh))
  }

  useEffect(() => {
    featureApi
      .getAll({ roomId: roomId, roomTemplateId: templateId, pageSize: 1000 })
      .then(res => setFeatures(res.list))

    featureCatApi
      .getAll({ roomId: roomId, roomTemplateId: templateId, pageSize: 1000 })
      .then(res => setCategories(res.list))

    templateConnectionApi
      .getAll({ roomTemplateId: templateId, pageSize: 1000 })
      .then(res => setRoomTemplateConns(res.list))

    if (!!roomId == 1) {
      roomConnectionApi
        .getAll({ roomId: roomId, pageSize: 1000 })
        .then(res => setRoomConns(res.list))
    }
  }, [refresh])

  return (
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

        {categories &&
          categories.map((x, xi) => (
            <div key={xi} style={{ height: "100%", width: "100" }}>
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
                  features
                    .filter(y => y.roomFeatureCategoryId == x.id)
                    .map((y, yi) => (
                      <div
                        key={yi}
                        style={{
                          height: 30,
                          width: 200,
                          color: "white",
                        }}
                      >
                        <div className="form-check form-switch form-switch-md mb-3">
                          <input
                            disabled={
                              !!roomId &&
                              roomTemplateConns?.some(
                                z => z.roomFeatureId == y.id
                              )
                            }
                            type="checkbox"
                            className="form-check-input"
                            id={`customSwitchsizemd_${yi}_${y.id}`}
                            checked={
                              (!!roomId &&
                                roomConns?.some(
                                  z => z.roomFeatureId == y.id
                                )) ||
                              roomTemplateConns?.some(
                                z => z.roomFeatureId == y.id
                              )
                            }
                            onClick={() => toggleFeature(y)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`customSwitchsizemd_${yi}_${y.id}`}
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
  )
}

export default RoomFeaturesComp
