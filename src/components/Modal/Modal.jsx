import { Component } from 'react';

import styles from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeByEsc);
  }

  closeByEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };
  render() {
    const {
      closeModal,
      currentImage: { src, alt },
    } = this.props;
    console.log(src);
    return (
      <div className={styles.Overlay}>
        <div className={styles.Modal}>
          <button className="" onClick={closeModal} type="button">
            Close
          </button>
          <img src={'https://image.tmdb.org/t/p/w500/' + src} alt={alt} />
        </div>
      </div>
    );
  }
}

export default Modal;
