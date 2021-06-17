import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minHeight: "25vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "space-around",
    width: "70%",
    color: "rgb(72,61,139)",
    background: "#E6E6FA",
    boxShadow: `0 0 0 1900px hsla(220,7%,18%,0.6),
          0 10px 30px -5px hsla(220,7%,18%,0.6)`,
  },
  overlay: { zIndex: 1000 },
};

Modal.setAppElement("#root");
function ModalComp({ modalIsOpen, children, closeModal, afterOpenModal }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {children}
    </Modal>
  );
}

export default ModalComp;
