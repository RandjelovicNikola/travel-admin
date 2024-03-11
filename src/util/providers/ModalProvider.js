import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalType, setModalType] = useState("");

  const openModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData("");
  };

  return (
    <ModalContext.Provider
      value={{
        modalType,
        modalData,
        isModalOpen,
        openModal,
        closeModal,
        setModalType,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
