import React, { useContext, useCallback, memo } from "react"
import { Modal, Row } from "reactstrap"
import { ModalContext } from "util/providers/ModalProvider"

const MyModal = () => {
  const { isModalOpen, modalType, closeModal, modalTitle } =
    useContext(ModalContext)

  return (
    <Modal
      isOpen={isModalOpen}
      toggle={closeModal}
      scrollable={true}
      className="modal-dialog-centered"
    >
      <div className="modal-header">
        <h5 className="modal-title mt-0">{modalTitle}</h5>
        <button
          type="button"
          onClick={closeModal}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      {modalType === "edit" ? <EditModalBody /> : "asd"}
    </Modal>
  )
}

const EditModalBody = memo(() => {
  const { modalData, closeModal, modalApi, setModalData, toggleRefresh } =
    useContext(ModalContext)

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

const InputComponent = memo(({ item, handleInputChange }) => {
  const { modalEmptyModel } = useContext(ModalContext)

  const handleChange = useCallback(
    value => {
      handleInputChange({
        key: item[0],
        value,
      })
    },
    [item, handleInputChange]
  )

  switch (modalEmptyModel[item[0]]) {
    case "string":
      return <MyModalTextInput item={item} handleChange={handleChange} />
    case "int32":
      return <MyModalNumberInput item={item} handleChange={handleChange} />
    case "boolean":
      return <MyModalBooleanInput item={item} handleChange={handleChange} />
    default:
      return null
  }
})

const MyModalTextInput = memo(({ item, handleChange }) => (
  <Row className="mb-3">
    <label className="col-md-2 col-form-label">{item[0]}</label>
    <div className="col-md-10">
      <input
        className="form-control"
        type="text"
        value={item[1]}
        onChange={e => handleChange(e.target.value)}
      />
    </div>
  </Row>
))

const MyModalNumberInput = memo(({ item, handleChange }) => (
  <Row className="mb-3">
    <label className="col-md-2 col-form-label">{item[0]}</label>
    <div className="col-md-10">
      <input
        disabled={item[0] === "id"}
        className="form-control"
        type="number"
        value={item[1]}
        onChange={e => handleChange(e.target.value)}
      />
    </div>
  </Row>
))

const MyModalBooleanInput = memo(({ item, handleChange }) => (
  <Row className="mb-3">
    <div className="form-check form-check-info mb-3">
      <input
        type="checkbox"
        className="form-check-input"
        id={`customCheck_${item[0]}`}
        checked={!!item[1]}
        onChange={e => handleChange(e.target.checked)}
      />
      <label className="form-check-label" htmlFor={`customCheck_${item[0]}`}>
        Checkbox Info
      </label>
    </div>
  </Row>
))

EditModalBody.displayName = "EditModalBody"
InputComponent.displayName = "InputComponent"
MyModalTextInput.displayName = "MyModalTextInput"
MyModalNumberInput.displayName = "MyModalNumberInput"
MyModalBooleanInput.displayName = "MyModalBooleanInput"

export default MyModal
