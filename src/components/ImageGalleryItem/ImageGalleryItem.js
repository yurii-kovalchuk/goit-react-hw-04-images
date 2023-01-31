import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  item: { webformatURL, largeImageURL, tags },
}) => {
  const [modal, setModal] = useState(false);

  const modalOpen = () => {
    setModal(true);
  };

  const modalClose = () => {
    setModal(false);
  };

  return (
    <>
      <GalleryItem onClick={modalOpen}>
        <GalleryItemImage src={webformatURL} alt={tags} />
      </GalleryItem>
      {modal && <Modal src={largeImageURL} alt={tags} onClose={modalClose} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
