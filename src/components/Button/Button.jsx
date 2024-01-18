import PropTypes from 'prop-types';
import css from './Button.module.css';

export default function Button({ onClick }) {
  return (
    <button className={css.button} type="button" onClick={onClick}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};