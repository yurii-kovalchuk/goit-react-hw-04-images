import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ModalContent, Overlay } from './Modal.styled';

export const Modal = ({ src, alt, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', onKeydown);

    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  });
  const onKeydown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const onOverlay = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={onOverlay}>
      <ModalContent>
        <img src={src} alt={alt} />
      </ModalContent>
    </Overlay>
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
