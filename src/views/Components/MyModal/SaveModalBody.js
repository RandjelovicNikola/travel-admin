import React, { useCallback, useContext, memo } from "react"
import { ModalContext } from "util/providers/ModalProvider"
import ModalInputComponent from "./ModalInputComponent"

const SaveModalBody = memo(() => {
  const {
    modalData,
    closeModal,
    modalApi,
    setModalData,
    toggleRefresh,
    modalEmptyModel,
    modalType,
    modalIgnoredProps,
  } = useContext(ModalContext)

  const handleSave = useCallback(() => {
    console.log(modalData)
    modalType == "edit"
      ? modalApi
          .update(modalData.id, modalData)
          .then(toggleRefresh)
          .finally(closeModal)
      : modalApi.create(modalData).then(toggleRefresh).finally(closeModal)
  }, [modalApi, closeModal, toggleRefresh])

  const handleInputChange = useCallback(
    ({ key, value }) => {
      setModalData(currentData => ({
        ...currentData,
        [key]: value,
      }))
    },
    [setModalData]
  )

  return (
    <div className="modal-body">
      {!!modalEmptyModel &&
        Object.entries(modalEmptyModel)
          .filter(
            x =>
              (modalType == "edit" || x[0] != "id") &&
              !modalIgnoredProps.includes(x[0])
          )
          .map((x, i) => (
            <ModalInputComponent
              key={i}
              item={[x[0], modalData[x[0]]]}
              emptyModel={modalEmptyModel}
              handleInputChange={handleInputChange}
              disabled={modalType == "edit" && x[0] == "id"}
            />
          ))}
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={closeModal}
        >
          Close
        </button>
        <button onClick={handleSave} type="button" className="btn btn-primary">
          Save changes
        </button>
      </div>
    </div>
  )
})

SaveModalBody.displayName = "SaveModalBody"

export default SaveModalBody
