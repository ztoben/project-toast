import React from 'react';
import {useEscapeKey} from "../../hooks/use-escape-key";

export const ToastContext = React.createContext({});

function ToastProvider({children}) {
  const [toasts, setToasts] = React.useState([]);

  useEscapeKey(() => {
    setToasts([]);
  });

  const popToast = ({message, variant}) => {
    setToasts([...toasts, { message, variant }]);
  }

  const removeToast = (idx) => {
    const newToasts = [...toasts];
    newToasts.splice(idx, 1);
    setToasts(newToasts);
  }

  return (
    <ToastContext.Provider value={{ toasts, popToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider;
