import React, {useEffect} from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';
import ToastShelf from "../ToastShelf";
import {ToastContext} from "../ToastProvider";

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const {toasts, popToast, removeToast} = React.useContext(ToastContext);
  const [message, setMessage] = React.useState('');
  const [selectedVariant, setSelectedVariant] = React.useState(VARIANT_OPTIONS[0]);

  // use effect to add keyboard esc listener to dismiss all toasts
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        toasts.forEach((toast, idx) => removeToast(idx));
      }
    }
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    }
  }, []);

  const handleVariantChange = (event) => {
    setSelectedVariant(event.target.value);
  }

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  }

  const handlePopToast = () => {
    popToast({message, variant: selectedVariant});
    setMessage('');
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {/*{toasts.map((toast, idx) => (*/}
      {/*  <Toast variant={toast.variant} message={toast.message} onDismiss={() => removeToast(idx)} />*/}
      {/*))}*/}

      <ToastShelf toasts={toasts} onDismiss={removeToast} />

      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea id="message" className={styles.messageInput} onChange={handleInputChange} value={message} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map((variant) => (
              <label htmlFor={`variant-${variant}`} key={variant}>
                <input
                  id={`variant-${variant}`}
                  type="radio"
                  name="variant"
                  value={variant}
                  checked={selectedVariant === variant}
                  onChange={handleVariantChange}
                />
                {variant}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button onClick={handlePopToast}>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToastPlayground;
