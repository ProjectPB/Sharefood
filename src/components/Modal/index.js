import React from "react";
import { Close } from "@material-ui/icons";
import "./styles.css";

const Modal = ({ hideModal, toggleModal, children }) => {
  if (hideModal) return null;

  return [
    <div className="modal__overlay" onClick={() => toggleModal()} />,
    <div className="modal__wrap">
      <div className="modal">
        <Close className="modal__close" onClick={() => toggleModal()} />
        {children}
      </div>
    </div>
  ];
};

export default Modal;
