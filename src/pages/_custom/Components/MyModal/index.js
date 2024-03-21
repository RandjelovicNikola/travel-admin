import React, { useContext, useCallback, memo } from "react"
import { Modal, Row } from "reactstrap"
import { ModalContext } from "util/providers/ModalProvider"
import DeleteModalBody from "./DeleteModalBody"
import SaveModalBody from "./SaveModalBody"

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

      {modalType === "edit" || modalType === "add" ? (
        <SaveModalBody />
      ) : modalType === "delete" ? (
        <DeleteModalBody />
      ) : (
        "asd"
      )}
    </Modal>
  )
}

export default MyModal
