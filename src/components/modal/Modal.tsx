import "./modal.scss";
// import { CloseIcon } from "@chakra-ui/icons";
import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>
          {/* <CloseIcon /> */} <p>X</p>
        </button>
        <p>Employee Created!</p>
      </div>
    </div>
  );
};

export default Modal;
