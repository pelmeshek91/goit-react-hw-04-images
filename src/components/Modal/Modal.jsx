import { useEffect } from 'react';

export const Modal = ({ modalImage: { src, alt }, closeModal }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const closeByEscape = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const closeByBackdrop = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', closeByEscape);

    return () => {
      window.removeEventListener('keydown', closeByEscape);
    };
  }, [closeByEscape]);

  return (
    <div className="Overlay" onClick={closeByBackdrop}>
      <div className="Modal">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};
