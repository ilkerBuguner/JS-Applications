function attachEvents() {
    const elements = {
        author() {return document.getElementById('author')},
        content() {return document.getElementById('content')},
        submitBtn() {return document.getElementById('submit')},
        refreshBtn() {return document.getElementById('refresh')},
        messagesField() {return document.getElementById('messages')}
    };

    const baseUrl = 'http://localhost:3000/messenger';
    const chat = [];

    elements.submitBtn().addEventListener('click', () => {
        const authorName = elements.author().value;
        const messageContent = elements.content().value;

        fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify({authorName, messageContent})
        })
            .then((response) => response.json())
            .then((response) => {
                chat.push(response);
                elements.author().value = '';
                elements.content().value = '';
            })
    });

    elements.refreshBtn().addEventListener('click', () => {
        elements.messagesField().value = '';
        chat.forEach((chatMessage) => {
            const key = Object.keys(chatMessage)[0];
            const contentToPush = `\n${chatMessage[key].authorName} - ${chatMessage[key].messageContent}`;
            elements.messagesField().value += contentToPush;
        });
    });
    
}

attachEvents();