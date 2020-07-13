const appId = 'A2BB1110-8740-5501-FFC2-0CEEE4DD6700';
const apiKey = '9D4709EF-1BAA-4AA4-BFB0-398A156EBE60';

function host(endpoint) {
    return `https://api.backendless.com/${appId}/${apiKey}/data/${endpoint}`;
}

export async function getBooks() {
    const response = await fetch(host('books'));
    const data = await response.json();
    return data;
}

export async function createBook(book) {
    const response = await fetch(host('books'), {
        method: 'POST',
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export async function updateBook(book) {
    const id = book.objectId
    const response = await fetch(host(`books/${id}`), {
        method: 'PUT',
        body: JSON.stringify(book),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export async function deleteBook(id) {
    const response = await fetch(host(`books/${id}`), {
        method: 'DELETE'
    });
    const data = response.json();
    return data;
}