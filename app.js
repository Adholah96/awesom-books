const libraryBooks = document.querySelector('[data-book]')
const titleName = document.getElementById('titleName')
const authorName = document.getElementById('authorName')
const form = document.getElementById('myForm')

class Library {
  constructor(id, author, title) {
    this.id = id
    this.author = author
    this.title = title
  }
  //Local Storage

  static addLocalStorage(libraryContainer) {
    let storage = localStorage.setItem(
      'books',
      JSON.stringify(libraryContainer)
    )
    return storage
  }

  static getLocalStorage() {
    let storage =
      localStorage.getItem('books') === null
        ? []
        : JSON.parse(localStorage.getItem('books'))
    return storage
  }

  // display in the DOM

  static displayBooks() {
    let displayData = libraryContainer.map((item) => {
      return `
        <div class='books'>
        <p> "${item.title}" by ${item.author} </p>   
        <button class="delete-btn" data-id= ${item.id}>Remove</button>
        </div>
        `
    })
    libraryBooks.innerHTML = displayData.join(' ')
  }

  //clear input once submited
  static clearInput() {
    titleName.value = ''
    authorName.value = ''
  }

  //delete book from DOM and arraylibrary
  static deleteBook() {
    libraryBooks.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove()
      }
      let btnId = e.target.dataset.id
      Library.removeLibraryArray(btnId)
    })
  }
  static removeLibraryArray(id) {
    libraryContainer = libraryContainer.filter((item) => item.id !== +id)
    Library.addLocalStorage(libraryContainer)
  }
}

// innitialize form submit to create Library instance
form.addEventListener('submit', (e) => {
  e.preventDefault()
  let id = Math.floor(Math.random() * 1000)
  const book = new Library(id, authorName.value, titleName.value)
  libraryContainer.push(book)
  Library.displayBooks()
  Library.clearInput()
  Library.deleteBook()
  Library.addLocalStorage(libraryContainer)
})

window.addEventListener('DOMContentLoaded', () => {
  Library.displayBooks()
  Library.deleteBook()
})

//store values in a container referrenced by local storage

let libraryContainer = Library.getLocalStorage()
