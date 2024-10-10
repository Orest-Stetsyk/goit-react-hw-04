import { useState, useEffect } from 'react'
import { fetchImagesWithSearch } from './image-api.js';
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import Loader from './components/Loader/Loader.jsx';
import ImageGallery from './components/ImageGallery/ImageGallery.jsx';
import ImageModal from './components/ImageModal/ImageModal.jsx';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn.jsx';
import ErrorMessage from './components/ErrorMessage/ErrorMessage.jsx';



function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (search.trim() === "") {
      return;
    }
    async function fetchImages() {
      
      try {
        setError(false);
        setLoading(true);
        const { results, total } = await fetchImagesWithSearch(search, page);
        setImages((prevState) => [...prevState, ...results]);
        setTotal(total);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [page, search]);

  const handleSearch = async (search) => {
    setSearch(search); 
    setPage(1);
    setImages([]);
  }

  const fetchMore = async () => {
    setPage(page + 1);
  }

  const clickModal = (image) => {
    setSelected(image);
    setIsOpen(true);
  }

  const closeModal = () => {
    setSelected(null);
    setIsOpen(false);
  }


  return (
    <div className='app-container'>
      <h1 className='app-title'>Find your picture</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && (<Loader />)}
      {error && (<ErrorMessage />)}
      {images.length > 0 && (<ImageGallery items={images} onClick={clickModal} />)}
      {images.length > 0 && !loading && images.length < total && (<LoadMoreBtn fetchMore={fetchMore} />)}
      {selected&& (<ImageModal
        image={selected}
        isOpen={isOpen}
        onClose={closeModal}
      />)}
    </div>
  )
}

export default App
