import React from "react";
import { Close } from "@material-ui/icons";

import "./styles.scss";

interface Props {
  modalOpened: boolean;
  toggleModal: () => void;
}

const Modal: React.FC<Props> = ({ modalOpened, toggleModal, children }) => {
  if (!modalOpened) return null;

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
