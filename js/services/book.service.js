import { storageService } from './async-storage.service.js'
import { utilService } from './utils.service.js'
import gBooks from '../../books.json' assert {type: 'json'}
import googleBooks from '../../google-books.json' assert {type: 'json'}

export const bookService = {
  query,
  get,
  save,
  paramMap: getParamaeterMap,
  getEmptyBook,
  getNeighbours,
  search: querySearch
}

const BOOKS_KEY = 'booksDB'
const gGoogleBooks = googleBooks
_createBooks()

function query() {
  let books = storageService.query(BOOKS_KEY)
    .then(books => {
      if (books && books.length) return books
      books = _createBooks()
      utilService.save(BOOKS_KEY, books)
    })
  return new Promise(resolve => resolve(books))
}

function querySearch(val){
  const regex = new RegExp(val, 'i')
  return storageService.query(BOOKS_KEY)
    .then(books=>{
      return new Promise(resolve=>resolve(googleBooks))
        .then(googleBooks => {
          const result = []
          result.push(...books.filter(book=>(regex.test(book.title))))
          googleBooks.items.forEach(book=>{
            if (regex.test(book.volumeInfo.title)&&
                !result.find(resBook=> resBook.googleId &&
                  resBook.googleId === book.id)) result.push(_googleToLocalFormat(book))
          })
          return result
        })
    })
  
}

function get(bookId) {
  return storageService.get(BOOKS_KEY, bookId)
}

function save(book) {
  if (book.id) return storageService.put(BOOKS_KEY, book)
  return storageService.post(BOOKS_KEY, book)

}

function getEmptyBook() {
  return {
    "title": '',
    "subtitle": '',
    "authors": [],
    "publishedDate": 0,
    "description": '',
    "pageCount": 0,
    "categories": [],
    "thumbnail": '',
    "language": '',
    "listPrice": {
      "amount": 0,
      "currencyCode": '',
      "isOnSale": false
    }
  }
}

function getParamaeterMap() {
  return query()
    .then(books => {
      const params = books.reduce((acc, book) => {
        book.categories.forEach(category => {
          if (!acc.categories.includes(category)) acc.categories.push(category)
        })
        if (!acc.languages.includes(book.language)) acc.languages.push(book.language)
        if (!acc.currencyCodes.includes(book.listPrice.currencyCode)) acc.currencyCodes.push(book.listPrice.currencyCode)
        return acc
      }, {
        categories: [], currencyCodes: [], languages: []
      })
      return params
    })
}

function getNeighbours(bookId){
  return storageService.query(BOOKS_KEY)
    .then(books=>{
      const idx = books.findIndex(book=> book.id === bookId)
      const nextIdx = (idx +1 + books.length) % books.length
      const prevIdx = (idx - 1 + books.length) % books.length
      return {
        next: books[nextIdx].id,
        prev: books[prevIdx].id
      }
    })
}

function _createBooks() {
  let books = utilService.load(BOOKS_KEY)
    if(!books || !books.length) {
      books = gBooks
      utilService.save(BOOKS_KEY, books)
    }
    return books
}

function _googleToLocalFormat(book){
  const {volumeInfo: {title, subtitle,authors,publishedDate,description,
  pageCount,categories,language}} = book
  let thumbnail
  if (book.volumeInfo.imageLinks && 
    book.volumeInfo.imageLinks.thumbnail) ({thumbnail} = book.volumeInfo.imageLinks)
  else thumbnail = ''

    const newBook = {
      googleId: book.id,
      title,
      subtitle,
      authors,
      publishedDate: publishedDate.slice(0,4),
      description,
      pageCount,
      categories,
      thumbnail,
      language,
      listPrice: {
        amount: 100+(parseInt(Math.random()*(100)+21)),
        currencyCode:'ILS',
        isOnSale: book.saleInfo.isEbook
      },
    }
    return newBook
}