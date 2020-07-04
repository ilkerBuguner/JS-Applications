function getInfo() {
    const baseURL = "https://judgetests.firebaseio.com/businfo/{stopId}.json";

    const validIds = ['1287', '1308', '1327', '2334'];
    const elements = {
        stopId() { return document.getElementById('stopId') },
        stopName() { return document.getElementById('stopName') },
        buses() { return document.getElementById('buses') }
    };

    const stopId = elements.stopId().value;

    if(!validIds.includes(stopId)) {
        elements.stopName().textContent = 'ERROR';
        return;
    }

    const url = baseURL.replace('{stopId}', stopId);

    fetch(url)
        .then((response) => response.json())
        .then((result) => showInfo(result));

    function showInfo(data) {
        elements.buses().textContent = '';
        elements.stopName().textContent = data.name;

        Object.keys(data.buses).forEach((bus) => {
            let li = document.createElement('li');
            li.textContent = `Bus ${bus} arrives in ${data.buses[bus]}`;
            elements.buses().appendChild(li);
        });
    }
}