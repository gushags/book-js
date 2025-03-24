const myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.id = function () {
  this.id = crypto.randomUUID();
};

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  book = new Book(title, author, pages, read);
  book.id();
  myLibrary.push(book);
  updateLibrary();
}
addBookToLibrary("1984", "George Orwell", 200, true);
addBookToLibrary("The Sun Also Rises", "Ernest Hemingway", 250, false);
addBookToLibrary("Possession", "A.S. Byatt", 402, true);
console.table(myLibrary);

// Library content
function updateLibrary() {
  const library = document.querySelector(".library");
  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }
  for (let i = 0; i < myLibrary.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", myLibrary[i].id);

    // create card elements
    const title = document.createElement("h4");
    const author = document.createElement("h6");
    const pages = document.createElement("p");

    const del = document.createElement("button");
    const read = document.createElement("input");
    const label = document.createElement("label");
    const para = document.createElement("p");
    para.classList.add("read");
    del.classList.add("delete");
    del.setAttribute("data", myLibrary[i].id);
    del.addEventListener("click", () => {
      const id = del.getAttribute(["data"]);
      deleteBook(id);
    });

    title.textContent = myLibrary[i].title;
    author.textContent = myLibrary[i].author;
    pages.textContent = myLibrary[i].pages + " pages";
    read.textContent = myLibrary[i].read;
    del.textContent = "Delete";
    para.textContent = "Read";
    read.setAttribute("type", "checkbox");

    // If book is set to read, add checked to input
    if (myLibrary[i].read) {
      read.checked = true;
    }

    read.setAttribute("id", "toggle_checkbox" + myLibrary[i].id);
    label.setAttribute("for", "toggle_checkbox" + myLibrary[i].id);
    label.classList.add("read_label");

    library.appendChild(card);

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(para);
    card.appendChild(read);
    card.appendChild(label);
    card.appendChild(del);
  }
}

// Submit new book
const modal = document.querySelector("dialog");
const addBook = document.querySelector("#add_book");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelectorAll("[name='read']");
console.log(read);
const formButton = document.querySelector("#form_button");
addBook.addEventListener("click", () => {
  modal.showModal();
});
formButton.addEventListener("click", (e) => {
  e.preventDefault();
  const t = title.value;
  const a = author.value;
  const p = pages.value;
  let r = true;
  // const radio = document.getElementsByName("read");
  for (let i = 0; i < read.length; i++) {
    if (read[i].checked) {
      r = read[i].value === "yes";
    }
  }
  addBookToLibrary(t, a, p, r);
  modal.close();
  title.value = "";
  author.value = "";
  pages.value = "";
});

// delete button
function deleteBook(id) {
  // delete card with id
  document.getElementById(id).remove();
  const index = myLibrary.findIndex((book) => book.id === id);
  myLibrary.splice(index, 1);
}

updateLibrary();
