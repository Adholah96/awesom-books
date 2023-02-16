const libraryBooks = document.querySelector('[data-book]');
const titleName = document.getElementById('titleName');
const authorName = document.getElementById('authorName');
const form = document.getElementById('myForm');

class Library {
  constructor(id, author, title) {
    this.id = id;
    this.author = author;
    this.title = title;
  }
  // Local Storage

  static addLocalStorage(libraryContainer) {
    const storage = localStorage.setItem(
      'books',
      JSON.stringify(libraryContainer),
    );
    return storage;
  }

  static getLocalStorage() {
    const storage = localStorage.getItem('books') === null
      ? []
      : JSON.parse(localStorage.getItem('books'));
    return storage;
  }

  // display in the DOM

  static displayBooks() {
    /* eslint-disable no-use-before-define */
    const displayData = libraryContainer.map(
      (item) => `
        <div class='books'>
        <p> "${item.title}" by ${item.author} </p>   
        <button class="delete-btn" data-id= ${item.id}>Remove</button>
        </div>
        `,
    );
    libraryBooks.innerHTML = displayData.join(' ');
  }

  // clear input once submited
  static clearInput() {
    titleName.value = '';
    authorName.value = '';
  }

  // delete book from DOM and arraylibrary
  static deleteBook() {
    libraryBooks.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
      }
      const btnId = e.target.dataset.id;
      Library.removeLibraryArray(btnId);
    });
  }

  static removeLibraryArray(id) {
    libraryContainer = libraryContainer.filter((item) => item.id !== +id);
    Library.addLocalStorage(libraryContainer);
  }

  static currentDate() {
    const date = new Date();
    document.getElementById('dateDisplay').innerHTML = date;
  }
}

// innitialize form submit to create Library instance
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = Math.floor(Math.random() * 1000);
  const book = new Library(id, authorName.value, titleName.value);
  libraryContainer.push(book);
  Library.displayBooks();
  Library.clearInput();
  Library.deleteBook();
  Library.addLocalStorage(libraryContainer);
});

window.addEventListener('DOMContentLoaded', () => {
  Library.displayBooks();
  Library.deleteBook();
  Library.currentDate();
});

// store values in a container referrenced by local storage
let libraryContainer = Library.getLocalStorage();

// Single Page Applications
const books = document.querySelector('.listone');
const addNew = document.querySelector('.listtwo');
const contact = document.querySelector('.listthree');

const booksContainer = document.getElementById('booksContainer');
const contactContainer = document.getElementById('contact');

books.addEventListener('click', () => {
  booksContainer.style.display = 'block';
  form.style.display = 'none';
  contactContainer.style.display = 'none';
});
addNew.addEventListener('click', () => {
  booksContainer.style.display = 'none';
  form.style.display = 'block';
  contactContainer.style.display = 'none';
});
contact.addEventListener('click', () => {
  contactContainer.style.display = 'block';
  booksContainer.style.display = 'none';
  form.style.display = 'none';
});
