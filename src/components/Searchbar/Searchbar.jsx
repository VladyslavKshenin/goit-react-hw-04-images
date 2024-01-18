import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      return toast.warn('Please enter a search query', {
        position: 'top-right',
        theme: 'colored',
      });
    }

    onSubmit(searchQuery.trim());
    setSearchQuery('');
  };

  const handleQueryChange = e => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button className={css.button} type="submit">
          <ImSearch className={css.icon} />
          <span className={css.label}>Search</span>
        </button>
        <input
          className={css.input}
          type="text"
          name="searchQuery"
          value={searchQuery}
          onChange={handleQueryChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};