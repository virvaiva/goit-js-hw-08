// Add imports above this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');

galleryContainer.innerHTML = createPhotoCardsMarkup(galleryItems);



function createPhotoCardsMarkup(galleryItems) {

    return galleryItems.map(({ preview, original, description }) => {
        return `
    <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
    `
    })
        .join('');

}

let modalWindow = null;


function showModalWindow() {
  const showModalWindowLightbox = ({ alt, dataset: { source } }) => {
    modalWindow = basicLightbox.create(
      `<img style="color: #fff" src="${source}" alt="${alt}" width="800" height="600">`,
      {
        onShow: addKeyboardControl,
        onClose: removeKeyboardControl,
      }
    );

    modalWindow.show();
  };

  const addKeyboardControl = () => window.addEventListener('keydown', onWindowKeyDown);
  const removeKeyboardControl = () => window.removeEventListener('keydown', onWindowKeyDown);

  const onWindowKeyDown = ({ code }) => {
    if (code !== 'Escape') return;

    modalWindow.close();
  };

  const onGalleryContainerClick = event => {
    event.preventDefault();

    if (event.target.nodeName !== 'IMG') return;

    showModalWindowLightbox(event.target);
  };

  galleryContainer.addEventListener('click', onGalleryContainerClick);
}

showModalWindow();
var lightbox = new SimpleLightbox('.gallery a', { 
    captionDelay: 250,
  captionSelector: 'img',
  captionsData: 'alt',
 });