import React, { useEffect, useRef, FunctionComponent } from "react";
import { createPortal } from "react-dom";

interface IProps {
  onModalClose: function;
}

const Modal: FunctionComponent<IProps> = ({ children, onModalClose }) => {
  const elRef = useRef(document.createElement("div"));

  useEffect(() => {
    const modalRoot = document.getElementById("modal");

    if (!modalRoot) {
      return null;
    }
    modalRoot.appendChild(elRef.current);

    return () => {
      modalRoot.removeChild(elRef.current);
    };
  }, []);

  const handleTabKey = (e) => {
    const focusableModalElements = elRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
    );
    const firstElement = focusableModalElements[0];
    const lastElement = focusableModalElements[focusableModalElements.length - 1];

    if (!e.shiftKey && document.activeElement !== firstElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement !== lastElement) {
      lastElement.focus();
      e.preventDefault();
    }
    return null;
  };
  const keyListenersMap = new Map([
    [27, onModalClose],
    [9, handleTabKey],
  ]);

  useEffect(() => {
    function keyListener(e) {
      const listener = keyListenersMap.get(e.keyCode);

      return listener && listener(e);
    }
    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  });


  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
