const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        let str = `${title} by ${author}, ${pages} pages, `;
        if (read) {
            str += "already read"
        } else {
            str += "not read yet"
        }
        return str;
    }
}

function addBookToLibrary(title, author, pages, read){
    myLibrary.forEach( (elem) => {
        if (elem.title === title) {
            console.log("Book already exists");
            return false;
        }
    })
    myLibrary.push(new Book(title, author, pages, read));
    return true;
}

function removeBookFromLibrary(title) {
    let iterator = 0
    for(let elem of myLibrary) {
        if (elem.title === title) {
            myLibrary.splice(iterator, 1);
            return true;
        }
        iterator++;
    }
    return false;
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 257, false);
addBookToLibrary("7 Habits of highly effective people", "Stephen R. Covey", 405, true);
addBookToLibrary("Sophos security manual", "me", 100002, true)

const bookshelf = document.getElementById("bookShelf");
const addBookBtn = document.querySelector("header>button");
const PopUpForm = document.getElementById("popup-form");
const cancelPopUpBtn = document.getElementById("cancel-popup-form");

cancelPopUpBtn.addEventListener("click", function() {
    PopUpForm.style.display = "none";
})

addBookBtn.addEventListener("click", function() {
    PopUpForm.style.display = "flex";
});

PopUpForm.addEventListener("submit", function(e) {
    let formTitle = document.getElementById("formTitle").value;
    let formAuthor = document.getElementById("formAuthor").value;
    let formPages = document.getElementById("formPages").value;
    let formRead = document.getElementById("formRead").value;
    addBookToLibrary(formTitle, formAuthor, formPages, formRead)
    e.preventDefault();
    PopUpForm.style.display = "none";
    createBookCard(myLibrary[myLibrary.length - 1])
});


const createBookCard = (book) => {
    //create HTML elements
    const bookCard = document.createElement('div');
    const title = document.createElement('h4');
    const author = document.createElement('div');
    const pages = document.createElement('div');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    //add classes to the elements
    bookCard.classList.add("bookCard");
    title.classList.add("bookTitle");
    author.classList.add("bookAuthor");
    pages.classList.add("pagesNum");
    readBtn.classList.add("readBtn");
    removeBtn.classList.add("removeBtn");
    if( book.read ){
        readBtn.classList.add("read")
    } else {
        readBtn.classList.add("notRead")
    }

    //add textContent
    title.textContent = `${book.title}`;
    author.textContent = `${book.author}`;
    pages.textContent = `${book.pages}`;
    readBtn.textContent = book.read ? "read" : "not read";
    removeBtn.textContent = "remove";

    //add event listeners to buttons
    removeBtn.addEventListener("click", ()=>{
        let sibling = removeBtn.previousSibling;
        while (!sibling.classList.contains("bookTitle")) {
            sibling = sibling.previousSibling;
        }
        const bookShelf = document.getElementById("bookShelf");
        myLibrary.forEach( () => {
            bookShelf.removeChild(bookShelf.lastChild)
        })
        removeBookFromLibrary(sibling.textContent);
        displayBooks();
    })
    readBtn.addEventListener("click", ()=> {
        let sibling = removeBtn.previousSibling;
        while (!sibling.classList.contains("bookTitle")) {
            sibling = sibling.previousSibling;
        }
        let iterator = 0
        for(let elem of myLibrary) {
            if (elem.title === sibling.innerHTML) {
                break;
            }
            iterator++;
        }
        console.log("it" + iterator);
        if (myLibrary[iterator].read) {
            readBtn.classList.add("notRead");
            readBtn.classList.remove("read");
        } else {
            readBtn.classList.add("read");
            readBtn.classList.remove("notRead");
        }
        myLibrary[iterator].read = !myLibrary[iterator].read;

    })

    //make structure of HTML document
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(readBtn);
    bookCard.appendChild(removeBtn);

    //add book to the bookshelf
    bookshelf.appendChild(bookCard);
}

function displayBooks() {
    myLibrary.forEach( book => {
        createBookCard(book);
    })
}

displayBooks();
