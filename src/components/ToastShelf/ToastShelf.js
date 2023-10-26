import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf({toasts, onDismiss}) {
  return (
    <ol className={styles.wrapper} role="region" aria-live="polite" aria-label="Notification">
      {toasts.map((toast, idx) => (
        <li className={styles.toastWrapper} key={idx}>
          <Toast variant={toast.variant} message={toast.message} onDismiss={() => onDismiss(idx)} />
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
