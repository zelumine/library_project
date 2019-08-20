// Variables
let myLibrary = []
let addedInput = [];

const libraryArray = document.getElementById("library");
const booksList = document.getElementById("books-list");
const addButton = document.getElementById("adding-button");
const submitButton = document.getElementById("submit-button");
const addForm = document.getElementById("add-form");
const container = document.getElementById("container");
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
    this.toggleReadStatus = function() {
        this.readOrNot === "read" ? this.readOrNot = "not read" : this.readOrNot = "read";
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
        arr[i].readOrNot.includes("not") ? readClass = "not-read" 
                                        : readClass = "read";
        
        let bookRow = document.createElement("tr");
        bookRow.innerHTML = `<td class="title">${arr[i].title}</td>
                            <td class="author">${arr[i].author}</td>
                            <td class="pages">${arr[i].pages}</td>
                            <td class=${readClass}><div class="edit" data-index="${i}">${capitalize(arr[i].readOrNot)} <i class="fas fa-edit" data-index="${i}"></i></div></td>
                            <td><div class="supp" data-index="${i}">Delete <i class="fas fa-trash-alt" data-index="${i}"></div></td>`
        booksList.appendChild(bookRow);
    } 
    let deleteButtons = document.querySelectorAll(".supp");
    let editButtons = document.querySelectorAll(".edit");

    deleteButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            let index = e.target.dataset.index;
            booksList.deleteRow(index);
            myLibrary.splice(index, 1);
        });
    });
    
    editButtons.forEach(button => {
        button.addEventListener("click", changeStatus);
    });
}

function actualizeLibrary(arr) {
    if(arr.length > 0) {
        booksList.innerHTML = "";
    }
    render(arr);
        
    if(addedInput.length > 0) {
        addedInput = [];
        formInputs.forEach(input => {
            input.value = "";
        });
    }
}

function changeStatus(e) {
    let index = e.target.dataset.index;
    myLibrary[index].toggleReadStatus();
    actualizeLibrary(myLibrary);
}
// End functions

addBookToLibrary("whenIWasFive", "When I was five I killed myself", "Howard Butten", 191, "read");
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