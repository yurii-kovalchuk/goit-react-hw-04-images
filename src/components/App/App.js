import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { AppWrapper } from './App.styled';

export class App extends Component {
  state = {
    pictures: [],
    query: '',
    page: 1,
    total: 0,
    loader: false,
  };

  handleSubmit = query => {
    if (this.state.query === query) {
      return;
    }
    this.setState({ pictures: [], query, page: 1, total: 0 });
  };

  handleClick = () => {
    this.setState(state => ({
      page: state.page + 1,
      total: 0,
    }));
  };

  fetchGallery = async (query, page) => {
    try {
      this.setState({ loader: true });
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
      this.setState(state => ({
        pictures: [...state.pictures, ...hits],
        total,
      }));
    } catch (error) {
      toast(error.message);
      console.log(error);
    } finally {
      this.setState({ loader: false });
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      await this.fetchGallery(query, page);
    }
  }

  render() {
    const { pictures, total, page, loader } = this.state;
    return (
      <AppWrapper>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery pictures={pictures} />
        {loader && <Loader />}
        {total - page * 12 > 12 && <Button onClick={this.handleClick} />}
        <ToastContainer />
      </AppWrapper>
    );
  }
}
