import { useState } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export default function ImageGallery({ pictures }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);

  const handleClick = url => {
    setSelectedPicture(url);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <ul className={css.gallery}>
        {pictures.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClick={handleClick}
          />
        ))}
      </ul>
      {showModal && (
        <Modal onClose={toggleModal} pictureURL={selectedPicture} />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};