let library = []

const addBookButton = document.getElementById('add-book-button')
const bookForm = document.getElementById('book-form')
const bookDialog = document.getElementById('book-dialog')
const submitBook = document.getElementById('submit-book-button')
const cancelButton = document.getElementById('cancel-button')
const statusButton = document.getElementsByClassName('status-button')
let bookContainer = document.getElementById('book-container')

// função construtora para criar um novo livro
function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID()
  this.title = title
  this.author = author
  this.pages = pages
  this.isRead = isRead
}

// função que adiciona o livro à biblioteca
function addBookToLibrary(title, author, pages, isRead){
  const newBook = new Book(title, author, pages, isRead)
  library.push(newBook)
  return newBook
}

// função que renderiza o modal na tela
addBookButton.addEventListener('click', function(){
  bookDialog.style.display = 'block'
})

// função que cria o cartão do livro
function renderBookCard(newBook){
  const card = document.createElement('div')
  card.className = 'book-card'

  const title = document.createElement('h3')
  title.innerHTML = newBook.title

  const author = document.createElement('p')
  author.innerHTML = `Autor: ${newBook.author}`

  const pages = document.createElement('p')
  pages.innerHTML = `Páginas: ${newBook.pages}`

  const isRead = document.createElement('p')
  isRead.innerHTML = `Lido: ${newBook.isRead ? 'Lido' : 'Não lido'}`

  const status = document.createElement('button')
  status.innerHTML = 'Marcar como ' + (newBook.isRead ? 'Não lido' : 'Lido')
  status.className = 'status-button'

  // Adiciona o evento ao botão do card
  status.addEventListener('click', function() {
    newBook.isRead = !newBook.isRead
    isRead.innerHTML = `Lido: ${newBook.isRead ? 'Lido' : 'Não lido'}`
    status.innerHTML = 'Marcar como ' + (newBook.isRead ? 'Não lido' : 'Lido')
  })

  card.appendChild(title)
  card.appendChild(author)
  card.appendChild(pages)
  card.appendChild(isRead)
  card.appendChild(status)

  bookContainer.appendChild(card)
}

submitBook.addEventListener('click', function(e){
  e.preventDefault()

  const title = document.getElementById('book-title').value
  const author = document.getElementById('book-author').value
  const pages = document.getElementById('book-pages').value
  const isRead = document.getElementById('book-read').checked

  const newBook = addBookToLibrary(title, author, pages, isRead)
  renderBookCard(newBook)
  bookDialog.style.display = 'none'
  bookForm.reset()
})

cancelButton.addEventListener('click', function(){
  bookDialog.style.display = 'none'
  bookForm.reset()
})

