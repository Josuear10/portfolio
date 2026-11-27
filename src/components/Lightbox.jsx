import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function Icon({ d }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function Lightbox({ images, index, onChange, onClose }) {
  const closeRef = useRef(null);
  const touchX = useRef(null);
  const total = images.length;

  const go = useCallback(
    (step) => onChange((index + step + total) % total),
    [index, total, onChange],
  );

  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
    touchX.current = null;
  };

  const image = images[index];

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Galería de imágenes"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="lightbox__bar" onClick={(e) => e.stopPropagation()}>
        <span className="lightbox__count">{index + 1} / {total}</span>
        <button ref={closeRef} type="button" className="lightbox__btn" onClick={onClose} aria-label="Cerrar">
          <Icon d="M6 6l12 12M18 6 6 18" />
        </button>
      </div>

      <figure className="lightbox__stage" onClick={(e) => e.stopPropagation()}>
        <img key={image.src} src={image.src} alt={image.alt} />
      </figure>

      {total > 1 && (
        <>
          <button
            type="button"
            className="lightbox__btn lightbox__nav lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="Imagen anterior"
          >
            <Icon d="M15 5l-7 7 7 7" />
          </button>
          <button
            type="button"
            className="lightbox__btn lightbox__nav lightbox__nav--next"
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="Imagen siguiente"
          >
            <Icon d="M9 5l7 7-7 7" />
          </button>
          <div className="lightbox__thumbs" onClick={(e) => e.stopPropagation()}>
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                className={`lightbox__thumb${i === index ? ' is-active' : ''}`}
                onClick={() => onChange(i)}
                aria-label={`Ver imagen ${i + 1}`}
                aria-current={i === index}
              >
                <img src={img.src} alt="" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>,
    document.body,
  );
}
