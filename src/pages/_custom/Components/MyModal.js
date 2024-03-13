import React, { useContext, useEffect, useState } from "react"
import { Card, CardBody, CardTitle, Modal, Row } from "reactstrap"
import { ModalContext } from "util/providers/ModalProvider"

const MyModal = () => {
  const { isModalOpen, modalType, closeModal, modalTitle } =
    useContext(ModalContext)

  return (
    <Modal
      isOpen={isModalOpen}
      toggle={() => {
        closeModal()
      }}
      scrollable={true}
      className="modal-dialog-centered"
    >
      <div className="modal-header">
        <h5 className="modal-title mt-0">{modalTitle}</h5>
        <button
          type="button"
          onClick={() => closeModal()}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      {modalType == "edit" ? <EditModalBody /> : "asd"}
    </Modal>
  )
}

const EditModalBody = () => {
  const { modalData, closeModal, modalApi, setModalData } =
    useContext(ModalContext)

  const handleEdit = ({ id, item }) => {
    modalApi.update(id, item).then(res => console.log(res))
  }

  const handleTextInputChange = ({ key, value }) => {
    var currentData = { ...modalData }

    currentData[key] = value
    setModalData(currentData)
  }

  return (
    <div className="modal-body">
      {!!modalData &&
        Object.entries(modalData)
          .filter(x => x[0] != "id")
          .map((x, i) => {
            return (
              <Row key={i} className="mb-3">
                <label
                  htmlFor="example-text-input"
                  className="col-md-2 col-form-label"
                >
                  {x[0]}
                </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    type="text"
                    defaultValue="Artisanal kale"
                    value={x[1]}
                    onChange={e =>
                      handleTextInputChange({
                        key: x[0],
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </Row>
            )
          })}

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => closeModal()}
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
}

export default MyModal
