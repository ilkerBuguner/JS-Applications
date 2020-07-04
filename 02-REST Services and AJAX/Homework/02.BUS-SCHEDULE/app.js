function solve() {
    const baseURL = "https://judgetests.firebaseio.com/schedule/";
    let busStopId = 'depot';
    let busStopName = '';

    const elements = {
        info() {return document.querySelector('.info')},
        departButton() {return document.getElementById('depart')},
        arriveButton() {return document.getElementById('arrive')}
    };

    function depart() {
        fetch(baseURL + `${busStopId}.json`)
            .then((response) => response.json())
            .then((response) => showBusInfo(response));
        
        function showBusInfo(data) {
            elements.info().textContent = `Next stop ${data.name}`;
            busStopId = data.next;
            busStopName = data.name;
            switchButtonState();
        }
    }

    function arrive() {
        elements.info().textContent = `Arriving at ${busStopName}`;
        switchButtonState();
    }

    function switchButtonState() {
        const {disabled : isDisabled} = elements.arriveButton();

        if(isDisabled) {
            elements.arriveButton().disabled = false;
            elements.departButton().disabled = true;
        } else {
            elements.arriveButton().disabled = true;
            elements.departButton().disabled = false;
        }
    }

    return {
        depart,
        arrive
    };
}

let result = solve();