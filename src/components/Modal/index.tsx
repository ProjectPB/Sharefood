import React from "react";
import { Close } from "@material-ui/icons";

import "./styles.scss";

interface Props {
  hideModal: boolean;
  toggleModal: () => void;
}

const Modal: React.FC<Props> = ({ hideModal, toggleModal, children }) => {
  if (hideModal) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={() => toggleModal()} />
      <div className="modal__wrap">
        <div className="modal__body">
          <Close className="modal__close" onClick={() => toggleModal()} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
