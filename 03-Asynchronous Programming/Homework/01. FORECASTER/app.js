function attachEvents() {
    const requestedLocation = document.querySelector('#location');
    const submitButton = document.querySelector('#submit');
    const currentDiv = document.querySelector('#current');
    const upcomingDiv = document.querySelector('#upcoming');
    const forecastDiv = document.querySelector('#forecast');

    let baseUrl = 'https://judgetests.firebaseio.com/';

    const symbols = {
        'Sunny': '&#x2600;',
        'Partly sunny': '&#x26C5;',
        'Overcast':	'&#x2601;',
        'Rain': '&#x2614;',
        'Degrees': '&#176;'
    }

    submitButton.addEventListener('click', getWeather);

    async function getWeather(e) {
        await fetch(baseUrl + 'locations.json')
            .then((response) => response.json())
            .then((response) => findLocationWeather(response));  
    }

    async function findLocationWeather(data) {
        const location = data.find(l => l.name.toLowerCase() == requestedLocation.value.toLowerCase());
        
        if(!location) {
            forecastDiv.style.display = 'block';
            forecastDiv.textContent = 'Error';
            return;
        }

        await fetch(baseUrl + `forecast/today/${location.code}.json`)
            .then((response) => response.json())
            .then((response) => showCurrentForecast(response))

        await fetch(baseUrl + `forecast/upcoming/${location.code}.json`)
            .then((response) => response.json())
            .then((response) => showUpcomingForecast(response));
    }

    function showCurrentForecast(data) {
        const conditionSymbol = el('span', '', {className: 'condition symbol'})
        conditionSymbol.innerHTML = symbols[data.forecast.condition];

        const forecastDataDegreesSpan = el('span', '', {className: 'forecast-data'});
        forecastDataDegreesSpan.innerHTML = `${data.forecast.low}${symbols.Degrees}/${data.forecast.high}${symbols.Degrees}`;
        const currForecastDiv = el('div', [
            conditionSymbol,
            el('span', [
                el('span', data.name, {className: 'forecast-data'}),
                forecastDataDegreesSpan,
                el('span', data.forecast.condition, {className: 'forecast-data'})
            ], {className: 'condition'})
        ] , {className: 'forecasts'})

        forecastDiv.style.display = 'block';
        currentDiv.appendChild(currForecastDiv);
    }

    function showUpcomingForecast(data) {
        const upcomingForecastDiv = el('div', '', {className: 'forecast-info'});
        
        data.forecast.forEach(f => {
        const symbolSpan = el('span', '', {className: 'symbol'});
        symbolSpan.innerHTML = symbols[f.condition];

        const dataSpan = el('span', '', {className: 'forecast-data'});
        dataSpan.innerHTML = `${f.low}${symbols.Degrees}/${f.high}${symbols.Degrees}`;

            const oneDayForecast = el('span', [
                symbolSpan,
                dataSpan,
                el('span', f.condition, {className: 'forecast-data'})
            ], {className: 'upcoming'})

            upcomingForecastDiv.appendChild(oneDayForecast);
        })

        upcomingDiv.appendChild(upcomingForecastDiv);
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