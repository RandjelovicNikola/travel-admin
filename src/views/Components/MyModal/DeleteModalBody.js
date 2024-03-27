import MySeparator from "views/Common/MySeparator"
import React, { useContext } from "react"
import { ModalContext } from "util/providers/ModalProvider"

const DeleteModalBody = () => {
  const { closeModal, modalData, modalApi, toggleRefresh } =
    useContext(ModalContext)

  const handleDelete = () => {
    modalApi.remove(modalData).then(toggleRefresh).finally(closeModal)
  }

  return (
    <div
      className="modal-body"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span style={{ color: "white", fontSize: 16 }}>
        Are you sure you want to delete this item?
      </span>
      <MySeparator gap={30} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button onClick={handleDelete} type="button" className="btn btn-danger">
          Delete
        </button>
        <MySeparator ver={false} />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default DeleteModalBody
