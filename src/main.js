import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery, PER_PAGE } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoadMoreButton,
  hideLoader,
  showLoadMoreButton,
  showLoader,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', handleSearchSubmit);
loadMoreButton.addEventListener('click', handleLoadMoreClick);

async function handleSearchSubmit(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements['search-text'].value.trim();

  if (!searchQuery) {
    iziToast.show({
      message: 'Please fill in the search field!',
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
    return;
  }

  currentQuery = searchQuery;
  currentPage = 1;
  totalHits = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    if (totalHits > PER_PAGE) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.show({
      message: 'Something went wrong. Please try again later.',
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    form.reset();
  }
}

async function handleLoadMoreClick() {
  currentPage += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);
    scrollPage();

    const totalLoadedImages = currentPage * PER_PAGE;

    if (totalLoadedImages >= totalHits) {
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
      return;
    }

    showLoadMoreButton();
  } catch (error) {
    currentPage -= 1;
    iziToast.show({
      message: 'Something went wrong. Please try again later.',
      messageColor: '#fff',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function scrollPage() {
  const galleryItem = gallery.firstElementChild;

  if (!galleryItem) {
    return;
  }

  const { height } = galleryItem.getBoundingClientRect();

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
