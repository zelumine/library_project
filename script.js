// Variables
let myLibrary = []
let addedInput = [];

const libraryArray = document.getElementById("library");
const booksList = document.getElementById("books-list");
const addButton = document.getElementById("adding-button");
const submitButton = document.getElementById("submit-button");
const addForm = document.getElementById("add-form");
const container = document.getElementById("container");
const deleteButtons = document.getElementsByClassName("supp");
const formInputs = addForm.querySelectorAll("input");
const submitResponse = document.createElement("div");
// End variables

// Functions
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function Book(title, author, pages, readOrNot) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readOrNot = readOrNot;
    this.info = function() {
        return `"${this.title}" by ${this.author}, ${this.pages} pages, ${this.readOrNot}.`;
    }
}

function addBookToLibrary(name, title, author, pages, readOrNot) {
    name = new Book(title, author, pages, readOrNot);
    myLibrary.push(name);
}

function transformDataIntoBook(arr) {
    let bookTitle = arr[0];
    let bookAuthor = arr[1];
    let bookPages = arr[2];
    let bookStatus = arr[3];
    let bookName = bookTitle.toLowerCase().replace(/\W*/g, "");
    addBookToLibrary(bookName, bookTitle, bookAuthor, bookPages, bookStatus);
    actualizeLibrary(myLibrary);
}

function render(arr) {
    for(let i = 0; i < arr.length; i++) {
        let readClass;
        if(arr[i].readOrNot.includes("not")) {
            readClass = "not-read";
        } else {
            readClass = "read";
        }
        let bookRow = document.createElement("tr");
        bookRow.innerHTML = `<td class="hidden" >${i}</td>
                            <td class="title">${arr[i].title}</td>
                            <td class="author">${arr[i].author}</td>
                            <td class="pages">${arr[i].pages}</td>
                            <td class=${readClass}>${capitalize(arr[i].readOrNot)}</td>
                            <td><div class="supp" data-index="${i}">Delete <i class="fas fa-trash-alt"></div></td>`
        booksList.appendChild(bookRow);
    } 
}

function actualizeLibrary(arr) {
    if(arr.length > 0) {
        booksList.innerHTML = "";
    }
    render(arr);
    addedInput = [];
    formInputs.forEach(input => {
        input.value = "";
    });
}
// End functions

addBookToLibrary("whenIwasFive", "When I was five I killed myself", "Howard Butten", 191, "read");
addBookToLibrary("lordOfTheRings", "The Lord of the Rings", "J.R.R. Tolkien", 1441, "not read");
addBookToLibrary("it", "It", "Stephen King", 1392, "read");
addBookToLibrary("theStand", "The Stand", "Stephen King", 1472, "not read");

render(myLibrary);


// Events
addButton.addEventListener("click", () => {
    addForm.classList.toggle("hidden");
});

formInputs.forEach(input => {
    input.addEventListener("change", () => {
        addedInput.push(input.value);
    });
});

submitButton.addEventListener("click", () => {
    transformDataIntoBook(addedInput);
    actualizeLibrary(myLibrary);

    addForm.classList.add("hidden");
    submitResponse.textContent = "Thank you for your submission!";
    container.appendChild(submitResponse);
    setTimeout(() => { container.removeChild(submitResponse); }, 3000);
});

for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", (e) => {
        let index = e.target.dataset.index;
        booksList.deleteRow(index);
        myLibrary.splice(index, 1);
    });
};

