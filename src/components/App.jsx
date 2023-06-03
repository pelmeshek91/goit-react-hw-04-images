import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { useState } from 'react';

export const App = () => {
  const [searchImage, setSearchImage] = useState('');

  const resultBySearch = searchImage => {
    setSearchImage(searchImage);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={resultBySearch} />
      <ImageGallery searchImage={searchImage} />
    </div>
  );
};
