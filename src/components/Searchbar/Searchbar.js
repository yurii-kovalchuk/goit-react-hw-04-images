import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SearchWrapper,
  SearchBtn,
  SearchForm,
  SearchBtnSvg,
  SearchInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const formSubmit = e => {
    e.preventDefault();
    const value = e.target.elements.name.value.trim();

    if (value === '') {
      toast('Please fills in field');
      return;
    }

    onSubmit(value);
    e.target.reset();
  };
  return (
    <SearchWrapper>
      <SearchForm onSubmit={formSubmit}>
        <SearchBtn type="submit">
          <SearchBtnSvg />
        </SearchBtn>

        <SearchInput
          type="text"
          name="name"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
      <ToastContainer />
    </SearchWrapper>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
