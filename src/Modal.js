import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, onModalClose }) => {
  const elRef = useRef(null);

  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current);
  }, []);

  useEffect(() => {
    function keyListener(e) {
      const listener = keyListenersMap.get(e.keyCode);

      return listener && listener(e);
    }
    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  });

  const handleTabKey = e => {
    const focusableModalElements = elRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableModalElements[0];
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1];

    if (!e.shiftKey && document.activeElement !== firstElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement !== lastElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };

  const keyListenersMap = new Map([
    [27, onModalClose],
    [9, handleTabKey],
  ]);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
