import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImage } from 'services/pixabayAPI';

export const ImageGallery = ({ searchImage }) => {
  const [searchCopy, setSearchCopy] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (searchImage !== searchCopy) {
      setPage(1);
      setSearchCopy(searchImage);
      setIsLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchImage]);

  useEffect(() => {
    if (searchImage || (searchImage && page !== 1)) getImage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchCopy]);

  const getImage = async () => {
    try {
      const { hits, totalHits } = await fetchImage(searchImage, page);

      if (!totalHits) {
        warn();
      }

      setGallery(page === 1 ? hits : [...gallery, ...hits]);
      setTotalHits(totalHits);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const changePage = () => {
    setPage(prev => prev + 1);
  };
  const warn = () => {
    toast.warn('Did not find anything! Please change the request.');
  };

  const openModal = data => {
    setModalImage(data);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div>
      {!totalHits && <ToastContainer />}
      {searchImage && isLoading ? (
        <Loader />
      ) : (
        <ul className="ImageGallery">
          {gallery && (
            <ImageGalleryItem gallery={gallery} openModal={openModal} />
          )}
        </ul>
      )}

      {totalHits > gallery.length && <Button changePage={changePage} />}
      {modalImage && <Modal closeModal={closeModal} modalImage={modalImage} />}
    </div>
  );
};
ImageGallery.propTypes = {
  searchImage: PropTypes.string.isRequired,
};
