function attachEvents() {
    const anglerField = document.querySelectorAll('.angler')[1];
    const weightField = document.querySelectorAll('.weight')[1];
    const speciesField = document.querySelectorAll('.species')[1];
    const locationField = document.querySelectorAll('.location')[1];
    const baitField = document.querySelectorAll('.bait')[1];
    const captureTimeField = document.querySelectorAll('.captureTime')[1];
    const catchesDiv = document.querySelector('#catches');

    const addButton = document.querySelector('.add');
    const loadButton = document.querySelector('.load');
    const updateButton = document.querySelector('.update');
    const deleteButton = document.querySelector('.delete');
    let baseUrl = 'https://fisher-game.firebaseio.com/';
    
    addButton.addEventListener('click', addCatch);
    loadButton.addEventListener('click', loadCathes);

    async function addCatch(e) {
        const angler = anglerField.value;
        const weight = weightField.value;
        const species = speciesField.value;
        const location = locationField.value;
        const bait = baitField.value;
        const captureTime = captureTimeField.value;

        await fetch(baseUrl + 'catches.json', {
            headers: {'Content-type': 'application/json'},
            method: "POST",
            body: JSON.stringify({angler, weight, species, location, bait, captureTime})
        })
            .then((response) => console.log(response));

        clearInputs();
    }

    async function loadCathes(e) {
        catchesDiv.textContent = '';
        await fetch(baseUrl + 'catches.json')
            .then((response) => response.json())
            .then((response) => showLoadedCatches(response));

        function showLoadedCatches(data) {
            for (const [key, value] of Object.entries(data)) {
                const updateBtn = el('button', 'Update', {className: 'update'})
                const deleteBtn = el('button', 'Delete', {className: 'delete'});
                deleteBtn.addEventListener('click', deleteCatch);
                updateBtn.addEventListener('click', updateCatch);

                function createElement(type, className, value) {
                    return el('input', '', {
                        type: type,
                        className: className,
                        value: value});
                }

                const anglerInput = createElement('text', 'angler', value.angler);
                const weightInput = createElement('number', 'weight', value.weight);
                const speciesInput = createElement('text', 'species', value.species);
                const locationInput = createElement('text', 'location', value.location);
                const baitInput = createElement('text', 'bait', value.bait);
                const captureTimeInput = createElement('number', 'captureTime', value.captureTime);
                
                const currentCatch = el('div', [
                    el('label', 'Angler'),
                    anglerInput,
                    el('hr', ''),
                    el('label', 'Weight'),
                    weightInput,
                    el('hr', ''),
                    el('label', 'Species'),
                    speciesInput,
                    el('hr', ''),
                    el('label', 'Location'),
                    locationInput,
                    el('hr', ''),
                    el('label', 'Bait '),
                    baitInput,
                    el('hr', ''),
                    el('label', 'Capture Time'),
                    captureTimeInput,
                    el('hr', ''),
                    updateBtn,
                    deleteBtn
                ], {
                    className: 'catch',
                    'data-id': key
                });
                currentCatch.setAttribute('data-id', key);
                catchesDiv.appendChild(currentCatch)

                async function deleteCatch(e) {
                   await fetch(`${baseUrl}/catches/${key}.json`, {
                       method: "DELETE"
                   });
                   currentCatch.remove();
                };

                async function updateCatch(e) {
                    const angler = anglerInput.value;
                    const weight = weightInput.value;
                    const species = speciesInput.value;
                    const location = locationInput.value;
                    const bait = baitInput.value;
                    const captureTime = captureTimeInput.value;

                    await fetch(`${baseUrl}catches/${key}.json`, {
                        headers: {'Content-type': 'application/json'},
                        method: "PUT",
                        body: JSON.stringify({angler, weight, species,
                            location, bait, captureTime})});
                };
            }
        }
    }

    function clearInputs() {
        anglerField.value = '';;
        weightField.value = '';
        speciesField.value = '';
        locationField.value = '';
        baitField.value = '';
        captureTimeField.value = '';
    }
    function el(type, content, attributes) {
        const result = document.createElement(type);
    
        if (attributes !== undefined) {
          Object.assign(result, attributes);
        }
    
        if (Array.isArray(content)) {
          content.forEach(append);
        } else {
          append(content);
        }
    
        function append(node) {
          if (typeof node === 'string') {
            node = document.createTextNode(node);
          }
          result.appendChild(node);
        }
    
        return result;
      }
}


attachEvents();

