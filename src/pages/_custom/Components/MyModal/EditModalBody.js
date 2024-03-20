import React, { useCallback, useContext, memo } from "react"
import { ModalContext } from "util/providers/ModalProvider"
import InputComponent from "./InputComponent"

const EditModalBody = memo(() => {
  const {
    modalData,
    closeModal,
    modalApi,
    setModalData,
    toggleRefresh,
    modalEmptyModel,
  } = useContext(ModalContext)

  const handleEdit = useCallback(
    ({ id, item }) => {
      modalApi.update(id, item).then(toggleRefresh).finally(closeModal)
    },
    [modalApi, closeModal, toggleRefresh]
  )

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
          <InputComponent
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
        <button
          onClick={() => handleEdit({ id: modalData.id, item: modalData })}
          type="button"
          className="btn btn-primary"
        >
          Save changes
        </button>
      </div>
    </div>
  )
})

EditModalBody.displayName = "EditModalBody"

export default EditModalBody
