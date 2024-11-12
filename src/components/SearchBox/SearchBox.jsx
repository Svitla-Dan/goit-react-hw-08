import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiSearch } from 'react-icons/fi';
import { selectNameFilter } from '../../redux/filters/selectors';
import { changeFilter } from '../../redux/filters/slice';
import style from './SearchBox.module.css';

const SearchBox = () => {
  const inputId = useId();
  const dispatch = useDispatch();
  const query = useSelector(selectNameFilter);

  const handleSearch = event => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <div className={style.searchWrapper}>
      <label htmlFor={inputId} className={style.label}>
        Find contacts by name
      </label>
      <div className={style.inputContainer}>
        <input
          type="text"
          name="query"
          id={inputId}
          className={style.searchInput}
          value={query}
          onChange={handleSearch}
          placeholder="Search contacts..."
        />
        <FiSearch className={style.icon} />
      </div>
    </div>
  );
};

export default SearchBox;
