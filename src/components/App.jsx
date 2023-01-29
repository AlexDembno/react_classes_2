import { Component } from 'react';
import Button from './Button/Button';
import fetchMovies from './services/api/Api';
import MoviesGallery from './moviesGallery/moviesGallery';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    isMoviesShow: false,
    page: 1,
    movies: [],
    isLoading: false,
    currentImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { isMoviesShow, page } = this.state;
    if (
      (isMoviesShow !== prevState.isMoviesShow && isMoviesShow) ||
      (prevState.page !== page && isMoviesShow)
    ) {
      this.getMovies();
    }
    if (!isMoviesShow && isMoviesShow !== prevState.isMoviesShow) {
      this.setState({ movies: [], page: 1 });
    }
  }

  showFilmList = () => {
    this.setState(prevState => ({
      isMoviesShow: !prevState.isMoviesShow,
    }));
  };

  getMovies = () => {
    this.setState({ isLoading: true });
    fetchMovies(this.state.page)
      .then(({ data: { results } }) => {
        this.setState(prevState => ({
          movies: [...prevState.movies, ...results],
        }));
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  loadMore() {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  }

  openModal = data => {
    this.setState({ currentImage: data });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  render() {
    const { isMoviesShow, currentImage, movies } = this.state;
    const { showFilmList, loadMore, openModal, closeModal } = this;
    return (
      <>
        <Button
          click={showFilmList}
          text={isMoviesShow ? 'Hide movies list' : 'Show movies list'}
        />
        {isMoviesShow && (
          <>
            <MoviesGallery movies={movies} showModal={openModal} />
            <Button text="Load more" click={loadMore} />
          </>
        )}
        {currentImage && (
          <Modal currentImage={currentImage} closeModal={closeModal} />
        )}
      </>
    );
  }
}
