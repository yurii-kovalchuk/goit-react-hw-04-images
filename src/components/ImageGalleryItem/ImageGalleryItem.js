import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  };

  state = {
    modal: false,
  };

  modalOpen = () => {
    this.setState({
      modal: true,
    });
  };

  modalClose = () => {
    this.setState({
      modal: false,
    });
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props.item;
    const { modal } = this.state;
    return (
      <>
        <GalleryItem onClick={this.modalOpen}>
          <GalleryItemImage src={webformatURL} alt={tags} />
        </GalleryItem>
        {modal && (
          <Modal src={largeImageURL} alt={tags} onClose={this.modalClose} />
        )}
      </>
    );
  }
}
