function attachEvents() {
    const elements = {
        person() {return document.getElementById('person')},
        phone() {return document.getElementById('phone')},
        createContact() {return document.getElementById('btnCreate')},
        phonebook() {return document.getElementById('phonebook')},
        loadContacts() {return document.getElementById('btnLoad')}
    };
    const contacts = [];
    const baseUrl = 'http://localhost:3000/contacts';
    elements.createContact().addEventListener('click', () => {
        const {value: person} = elements.person();
        const {value: phone} = elements.phone();

        fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify({person, phone})
        })
            .then((response) => response.json())
            .then((response) => {
                contacts.push(response);
                elements.person().value = '';
                elements.phone().value = '';
            })

    });

    elements.loadContacts().addEventListener('click', () => {
        elements.phonebook().textContent = '';
        contacts.forEach((contact) => {
            let li = document.createElement('li');
            const key = Object.keys(contact)[0];
            li.textContent = `${contact[key].person} - ${contact[key].phone}`;
            elements.phonebook().appendChild(li);
        });
    });
}

attachEvents();