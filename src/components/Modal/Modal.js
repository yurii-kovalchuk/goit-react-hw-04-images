import PropTypes from 'prop-types';
import { Component } from 'react';
import { ModalContent, Overlay } from './Modal.styled';

export class Modal extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydown);
  }

  onKeydown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onOverlay = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt } = this.props;
    return (
      <Overlay onClick={this.onOverlay}>
        <ModalContent>
          <img src={src} alt={alt} />
        </ModalContent>
      </Overlay>
    );
  }
}
