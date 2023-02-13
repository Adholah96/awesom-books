function fetchLibrary() {
  const getBooks = JSON.parse(localStorage.getItem('books'));
  const libraryBooks = document.getElementById('libraryBooks');

  libraryBooks.innerHTML = '';

  for (let i = 0; i < getBooks.length; i += 1) {
    const { name } = getBooks[i];
    const { title } = getBooks[i];

    libraryBooks.innerHTML += `<p>${name}</p>
                               <p>${title}</p>   
                               <button onclick="deleteBook(\'${title}\')">Remove</button>
                               <hr>`;
  }
}

// eslint-disable-next-line  no-unused-vars
function deleteBook(title) {
  const books = JSON.parse(localStorage.getItem('books'));
  for (let i = 0; i < books.length; i += 1) {
    if (books[i].title === title) {
      books.splice(i, 1);
    }
  }
  localStorage.setItem('books', JSON.stringify(books));
  fetchLibrary();
}

function saveBooks(e) {
  // form values
  const titleName = document.getElementById('titleName').value;
  const authorName = document.getElementById('authorName').value;

  const library = {
    name: titleName,
    title: authorName,
  };

  //   local storage

  if (localStorage.getItem('books') === null) {
    const books = [];
    books.push(library);
    localStorage.setItem('books', JSON.stringify(books));
  } else {
    const books = JSON.parse(localStorage.getItem('books'));
    books.push(library);
    localStorage.setItem('books', JSON.stringify(books));
  }

  e.preventDefault();

  fetchLibrary();
}

document.getElementById('myForm').addEventListener('submit', saveBooks);
// const targetBody = document.getElementById('libraryBooks');

fetchLibrary();
