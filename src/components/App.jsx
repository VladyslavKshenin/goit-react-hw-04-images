import { useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGalery/ImageGallery';
import Button from './Button/Button';
import api from './Api/api';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingRequest, setPendingRequest] = useState(false);
  const [page, setPage] = useState(1);
  const [picturesSet, setPicturesSet] = useState([]);
  const [searchMatches, setSearchMatches] = useState(0);
  const [totalHits, setTotalHits] = useState(0);

  const fetchData = async () => {
    try {
      if (!searchQuery) {
        return;
      }

      setPendingRequest(true);

      const pictures = await api(searchQuery, page);

      setPendingRequest(false);
      setPicturesSet((prevPicturesSet) => [...prevPicturesSet, ...pictures.hits]);
      setTotalHits(pictures.totalHits);
      setSearchMatches((prevSearchMatches) => prevSearchMatches + pictures.hits.length);

      if (pictures.totalHits > 0 && page === 1) {
        toast.success(`Hooray! We found ${pictures.totalHits} images`, {
          position: 'top-right',
          theme: 'colored',
        });
      } else if (searchMatches === pictures.totalHits && pictures.totalHits > 0) {
        toast.info("You've reached the end of search results.", {
          position: 'top-right',
          theme: 'colored',
        });
      } else if (pictures.totalHits === 0) {
        toast.warn('No pictures were found for your query, please try another one!', {
          position: 'top-right',
          theme: 'colored',
        });
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, page]);

  const handleError = (error) => {
    setPendingRequest(false);
    toast.error(`An error occurred: ${error.message}`, {
      position: 'top-right',
      theme: 'colored',
    });
  };

  const handleQuery = (query) => {
    if (query === searchQuery) {
      toast.warn(`You are searching through the collection for "${query}" already!`, {
        position: 'top-right',
        theme: 'colored',
      });
    } else {
      setSearchQuery(query);
      setPage(1);
      setPicturesSet([]);
      setSearchMatches(0);
      setTotalHits(0);
    }
  };

  const loadMorePictures = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleQuery} />
      {picturesSet.length > 0 && <ImageGallery pictures={picturesSet} />}
      {pendingRequest && <Loader />}
      {searchMatches < totalHits && <Button onClick={loadMorePictures} />}

      <ToastContainer autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
    </div>
  );
}