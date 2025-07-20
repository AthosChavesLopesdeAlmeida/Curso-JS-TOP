function Info(title, author, pages, read){
  this.title = title
  this.author = author
  this.pages  = pages
  this.read = read
  this.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
  }
}

let book = new Info("The Hobbit", "J.R.R. Tolkien", 295, "already read")
console.log(book.info())

console.log(Object.getPrototypeOf(book) === Object.prototype)