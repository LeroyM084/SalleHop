import { useEffect } from 'react';

export const useOutsideClick = (ref, isOpen, onClose) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && ref.current && !ref.current.contains(event.target) && event.target.classList.contains('campus-details-overlay')) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, ref]);
};
