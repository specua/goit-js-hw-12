import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createGalleryMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img
              class="gallery-image"
              src="${webformatURL}"
              alt="${tags}"
              loading="lazy"
            />
          </a>
          <div class="image-info">
            <p class="image-info-item">
              <span class="image-info-label">Likes</span>
              <span>${likes}</span>
            </p>
            <p class="image-info-item">
              <span class="image-info-label">Views</span>
              <span>${views}</span>
            </p>
            <p class="image-info-item">
              <span class="image-info-label">Comments</span>
              <span>${comments}</span>
            </p>
            <p class="image-info-item">
              <span class="image-info-label">Downloads</span>
              <span>${downloads}</span>
            </p>
          </div>
        </li>`
    )
    .join('');
}

export function createGallery(images) {
  gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(images));
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreButton.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreButton.classList.add('is-hidden');
}
