function fetchLibrary() {
  const getBooks = JSON.parse(localStorage.getItem('books'))
  const libraryBooks = document.getElementById('libraryBooks')

  libraryBooks.innerHTML = ''

  for (let i = 0; i < getBooks.length; i += 1) {
    const { title, author } = getBooks[i]
    libraryBooks.innerHTML += `<p>${title}</p>
                               <p>${author}</p>   
                               <button data-target="${i}" class="delete-btn">Remove</button>
                               <hr>`
  }

  function deleteBook(index) {
    const books = JSON.parse(localStorage.getItem('books'))
    const filteredBooks = books.filter((book, i) => parseInt(index, 10) !== i)
    localStorage.setItem('books', JSON.stringify(filteredBooks))
    fetchLibrary()
  }

  const deleteButtons = document.querySelectorAll('.delete-btn')

  deleteButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const { target } = e
      const { dataset } = target
      const { target: btn } = dataset
      deleteBook(btn)
    })
  })
}

function saveBooks(e) {
  // form values
  const titleName = document.getElementById('titleName')
  const authorName = document.getElementById('authorName')

  const library = {
    title: titleName.value,
    author: authorName.value,
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

  titleName.value = ''
  authorName.value = ''

  fetchLibrary()
}

document.getElementById('myForm').addEventListener('submit', saveBooks)

fetchLibrary()
