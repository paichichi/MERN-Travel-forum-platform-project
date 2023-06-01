import { useState, useEffect, useRef } from 'react';

export function useModal(modalControlBtnRef) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleClickOutside(event) {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      modalControlBtnRef.current &&
      !modalControlBtnRef.current.contains(event.target)
    ) {
      closeModal();
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return { modalRef, isOpen, openModal, closeModal };
}
