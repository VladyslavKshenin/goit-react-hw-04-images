import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  handleClick = () => {
    const { onClick, largeImageURL } = this.props;
    onClick(largeImageURL);
  };

  render() {
    const { webformatURL } = this.props;
    return (
      <li className={css.item} onClick={this.handleClick}>
        <img className={css.image} src={webformatURL} alt="" loading="lazy" />
      </li>
    );
  }
}