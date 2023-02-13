document.getElementById('myForm').addEventListener('submit', saveBooks)

function saveBooks(e) {
  // form values
  const titleName = document.getElementById('titleName').value
  const authorName = document.getElementById('authorName').value

  const library = {
    name: titleName,
    title: authorName,
  }

  //   local storage

  if (localStorage.getItem('books') === null) {
    const books = []
    books.push(library)
    localStorage.setItem('books', JSON.stringify(books))
  } else {
    const books = JSON.parse(localStorage.getItem('books'))
    books.push(library)
    localStorage.setItem('books', JSON.stringify(books))
  }

  e.preventDefault()

  fetchLibrary()
}

const targetBody = document.getElementById('libraryBooks')

function fetchLibrary() {
  const getBooks = JSON.parse(localStorage.getItem('books'))
  const libraryBooks = document.getElementById('libraryBooks')

  libraryBooks.innerHTML = ''

  for (let i = 0; i < getBooks.length; i++) {
    const name = getBooks[i].name
    const title = getBooks[i].title
    libraryBooks.innerHTML +=
      `<p>${name}</p>
                               <p>${title}</p> 
                               <button onclick="deleteBook(\'` +
      title +
      `\')">Remove</button>
                               <hr>`
  }
}
fetchLibrary()

function deleteBook(title) {
  const books = JSON.parse(localStorage.getItem('books'))
  for (let i = 0; i < books.length; i++) {
    if (books[i].title === title) {
      books.splice(i, 1)
    }
  }
  localStorage.setItem('books', JSON.stringify(books))
  fetchLibrary()
}
