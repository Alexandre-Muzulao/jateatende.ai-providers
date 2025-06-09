import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  imageSrc: string;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
  primaryButtonText: string;
  secondaryButtonText: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  imageSrc,
  onPrimaryAction,
  onSecondaryAction,
  primaryButtonText,
  secondaryButtonText,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-subtitle">{subtitle}</p>
        <img className="modal-image" src={imageSrc} alt="Modal Illustration" />
        <div className="modal-footer">
          <button className="modal-button primary" onClick={onPrimaryAction}>
            {primaryButtonText}
          </button>
          <button className="modal-button secondary" onClick={onSecondaryAction}>
            {secondaryButtonText}
          </button>
        </div>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          position: relative;
          max-width: 500px;
          width: 100%;
        }
        .modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }
        .modal-title {
          font-size: 24px;
          margin-bottom: 10px;
        }
        .modal-subtitle {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .modal-image {
          max-width: 100%;
          height: auto;
          margin-bottom: 20px;
        }
        .modal-footer {
          display: flex;
          justify-content: space-between;
        }
        .modal-button {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .modal-button.primary {
          background: #007bff;
          color: white;
        }
        .modal-button.secondary {
          background: #6c757d;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Modal;