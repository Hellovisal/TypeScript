"use strict";
class Book {
    constructor(title, author, genre, ISBN, available = true) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.ISBN = ISBN;
        this.available = available;
    }
}
class UserAccount {
    constructor(name) {
        this.name = name;
        this.borrowed_books = [];
    }
    borrowBook(bookTitle, library) {
        const bookAvailability = library.borrowBook(bookTitle);
        if (bookAvailability) {
            this.borrowed_books.push(bookTitle);
        }
        return bookAvailability;
    }
    viewBorrowedBook() {
        return this.borrowed_books;
    }
}
;
class Student extends UserAccount {
    constructor(name) {
        super(name);
    }
    borrowBook(bookTitle, library) {
        if (this.borrowed_books.length >= 5) {
            return "Sorry, you can't borrow more than 5 books";
        }
        else {
            return super.borrowBook(bookTitle, library);
        }
    }
}
class Admin extends UserAccount {
    constructor(name) {
        super(name);
    }
    borrowBook(bookTitle, library) {
        return super.borrowBook(bookTitle, library);
    }
}
class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }
    addBook(book) {
        this.books.push(book);
    }
    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title && book.ISBN !== title);
    }
    searchBook(titleOrISBN) {
        titleOrISBN = titleOrISBN.toLowerCase();
        const foundBooks = this.books.filter((book) => book.title.toLowerCase() === titleOrISBN ||
            book.ISBN === titleOrISBN ||
            book.author.toLowerCase() === titleOrISBN ||
            book.genre.toLowerCase() === titleOrISBN);
        return foundBooks.length > 0 ? foundBooks : "Not found";
    }
    printBooks() {
        let i = 1;
        this.books.forEach((book) => {
            console.log(`===================> Book #${i++}`);
            console.log(`Title: ${book.title} , Author ${book.author} ,Genre: ${book.genre} , Available: ${book.available}, ISBN: ${book.ISBN}`);
            console.log("===================");
        });
    }
    borrowBook(title) {
        const foundBook = this.books.find((book) => book.title === title);
        if (foundBook && foundBook.available) {
            foundBook.available = false;
            return `You have successfully borrowed ${title}`;
        }
        return `Sorry, ${title} is not available`;
    }
    returnBook(title) {
        const foundBook = this.books.find((book) => book.title === title);
        if (foundBook && !foundBook.available) {
            foundBook.available = true;
            return `You have successfully returned ${title}`;
        }
        return `Sorry, ${title} is not available`;
    }
}
let book1 = new Book("First Love", "Sok", "Love", "123");
let book2 = new Book("Reactjs", "dara", "Code", "468");
let book3 = new Book("Principles of Economics", "Vireak", "Economics", "8888");
let book4 = new Book("Clay tablets", "Jon", "history", "9999");
let book5 = new Book("History of Angkor", "vichet", "history", "1100");
let book6 = new Book("History of Wat Phnom", "Vuth", "history", "1111");
let library = new Library("Rean An");
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);
library.addBook(book4);
library.addBook(book5);
library.addBook(book6);
console.log("Books in Library:");
library.printBooks();
