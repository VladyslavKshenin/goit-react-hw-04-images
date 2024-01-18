import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  onClick,
  largeImageURL,
  webformatURL,
}) {
  const handleClick = () => {
    onClick(largeImageURL);
  };

  return (
    <li className={css.item} onClick={handleClick}>
      <img className={css.image} src={webformatURL} alt="" loading="lazy" />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};