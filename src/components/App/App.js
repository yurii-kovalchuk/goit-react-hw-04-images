import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { useState, useEffect } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { AppWrapper } from './App.styled';

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetchGallery = async () => {
      try {
        setLoadMore(false);
        setLoader(true);
        const response = await axios.get('https://pixabay.com/api/', {
          params: {
            q: query,
            page: page,
            key: '31776776-892f87ec0bcca7b792e7dfca0',
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: '12',
          },
        });
        const { hits, total } = response.data;
        if (total === 0) {
          toast('There are no pictures with this name');
          return;
        }
        setPictures(state => [...state, ...hits]);
        if (total - page * 12 > 0) {
          setLoadMore(true);
        }
      } catch (error) {
        toast(error.message);
        console.log(error);
      } finally {
        setLoader(false);
      }
    };

    fetchGallery();
  }, [query, page]);

  const handleSubmit = value => {
    if (query === value) {
      return;
    }
    setPictures([]);
    setQuery(value);
    setPage(1);
  };

  const handleClick = () => {
    setPage(state => state + 1);
  };

  return (
    <AppWrapper>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery pictures={pictures} />
      {loader && <Loader />}
      {loadMore && <Button onClick={handleClick} />}
      <ToastContainer />
    </AppWrapper>
  );
};
