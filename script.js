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

let hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(hobbit.info());

console.log(Object.getPrototypeOf(hobbit) === Book.prototype)
console.log(hobbit.valueOf())