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
  } = useContext(ModalContext)

  const handleSave = useCallback(() => {
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
      {!!modalData &&
        Object.entries(modalData).map((x, i) => (
          <ModalInputComponent
            key={i}
            item={x}
            emptyModel={modalEmptyModel}
            handleInputChange={handleInputChange}
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
