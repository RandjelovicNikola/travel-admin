import React, { createContext, useState } from "react"

export const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [modalType, setModalType] = useState("")
  const [modalTitle, setModalTitle] = useState("Modal")
  const [modalApi, setModalApi] = useState(null)
  const [modalEmptyModel, setModalEmptyModel] = useState(null)
  const [refresh, setRefresh] = useState(false)

  const toggleRefresh = () => {
    setRefresh(!refresh)
  }

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
        toggleRefresh,
        modalEmptyModel,

        openModal,
        setModalType,
        setModalTitle,
        refresh,
        setModalEmptyModel,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
