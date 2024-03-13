import React, { createContext, useState } from "react"

export const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [modalType, setModalType] = useState("")
  const [modalTitle, setModalTitle] = useState("Modal")
  const [modalApi, setModalApi] = useState(null)

  const openModal = ({ data, api }) => {
    setModalApi(api)
    setModalData(data)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalApi(null)
    setModalData("")
  }

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        modalData,
        modalType,
        modalTitle,
        closeModal,
        modalApi,
        setModalData,

        openModal,
        setModalType,
        setModalTitle,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
