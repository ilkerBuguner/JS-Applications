//За този, който проверява домашното: Отвори BOOKS папката в терминала и напиши npm start
//и изчакай 10-20 секунди за да се стартира локалния сървър, то автоматично ще се стартира в браузъра. :)

import el from './dom.js';
import * as api from './data.js';

window.addEventListener('load',async () => {
    const tbodyElement = document.querySelector('tbody');
    const loadBooksBtn = document.querySelector('#loadBooks');
    const submitBookBtn = document.querySelector('#submitBookBtn');
    
    loadBooksBtn.addEventListener('click', loadBooks);
    async function loadBooks(e) {
        loadBooksBtn.textContent = 'Please wait..';
        const books = await api.getBooks();
        tbodyElement.textContent = '';
        books.forEach(book => {
            renderBook(book);
        });
        loadBooksBtn.textContent = 'LOAD ALL BOOKS';
    }

    submitBookBtn.addEventListener('click', createAndAddBook);
    async function createAndAddBook(e) {
        e.preventDefault();
        const titleInput = document.querySelector('#title');
        const authorInput = document.querySelector('#author');
        const isbnInput = document.querySelector('#isbn');

        if(!titleInput.value || !authorInput.value || !isbnInput.value) {
            alert('Please fill all required inputs!');
            return;
        }

        const bookToAdd = {
            title: titleInput.value,
            author: authorInput.value,
            isbn: isbnInput.value
        };

        const book = await api.createBook(bookToAdd);
        renderBook(book);
        titleInput.value = '';
        authorInput.value = '';
        isbnInput.value = '';
    }

    function renderBook(book) {
        const editButton = el('button', 'Edit');
        const deleteButton = el('button', 'Delete');
        const bookEl = el('tr', [
            el('td', book.title),
            el('td', book.author),
            el('td', book.isbn),
            el('td', [
                editButton,
                deleteButton
            ])
        ])

        deleteButton.addEventListener('click', deleteBook);
        async function deleteBook(e) {
            try {
                const objectId = book.objectId;
                deleteButton.textContent = 'Please wait..';
                await api.deleteBook(objectId);
            bookEl.remove();
            } catch(error) {
                alert(error)
            } finally {
                deleteButton.textContent = 'Delete';
            }
        }

        editButton.addEventListener('click', editBook);
        async function editBook(e) {
            const titleInput = el('input', '');
            const authorInput = el('input', '');
            const isbnInput = el('input', '');
            const saveBtn = el('button', 'Save');
            const cancelBtn = el('button', 'Cancel');
            
            titleInput.value = book.title;
            authorInput.value = book.author;
            isbnInput.value = book.isbn;
            const editBookEl = el('tr', [
                el('td', titleInput),
                el('td', authorInput),
                el('td', isbnInput),
                el('td', [
                    saveBtn,
                    cancelBtn
                ])
            ])

            tbodyElement.replaceChild(editBookEl, bookEl);
            
            cancelBtn.addEventListener('click', cancelEdit);
            function cancelEdit(e) {
                tbodyElement.replaceChild(bookEl, editBookEl);
            }

            saveBtn.addEventListener('click', saveBookInfo);
            async function saveBookInfo(e) {
                const title = titleInput.value;
                const author = authorInput.value;
                const isbn = isbnInput.value;
                const objectId = book.objectId;

                const bookToEdit = {title, author, isbn, objectId};
                const editedBook = await api.updateBook(bookToEdit);
                const editedBookEl = renderBook(editedBook);
                tbodyElement.replaceChild(editedBookEl, editBookEl);
            }
        }


        tbodyElement.appendChild(bookEl);
        return bookEl;
    }
});