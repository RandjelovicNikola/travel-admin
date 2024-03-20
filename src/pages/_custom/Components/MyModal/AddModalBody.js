import React, { useCallback, useContext, memo } from "react"
import { ModalContext } from "util/providers/ModalProvider"
import InputComponent from "./InputComponent"

const AddModalBody = memo(() => {
  const {
    modalData,
    closeModal,
    modalApi,
    setModalData,
    toggleRefresh,
    modalEmptyModel,
  } = useContext(ModalContext)

  const handleAdd = useCallback(
    ({ item }) => {
      modalApi.create(item).then(toggleRefresh).finally(closeModal)
    },
    [modalApi, closeModal, toggleRefresh]
  )

  const handleInputChange = useCallback(
    ({ key, value }) => {
      setModalData(currentData => ({ ...currentData, [key]: value }))
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
          onClick={() => handleAdd({ item: modalData })}
          type="button"
          className="btn btn-primary"
        >
          Add
        </button>
      </div>
    </div>
  )
})

AddModalBody.displayName = "AddModalBody"

export default AddModalBody
