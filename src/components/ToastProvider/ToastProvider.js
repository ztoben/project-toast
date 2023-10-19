import React from 'react';

export const ToastContext = React.createContext({});

function ToastProvider({children}) {
  const [toasts, setToasts] = React.useState([]);

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
