
window.addEventListener('load', async () => {
    const templateString = await (await fetch('./main-template.hbs')).text();
    Handlebars.registerPartial('town', await (await fetch('./town-template.hbs')).text())
    const rootDiv = document.querySelector('#root');
    const townsInput = document.querySelector('#towns');

    const templateFn = Handlebars.compile(templateString);
    
    document.querySelector('#btnLoadTowns').addEventListener('click', loadTowns);
    
    function loadTowns(e) {
        e.preventDefault();
        const towns = townsInput.value.split(', ');
        const generatedHtml = templateFn({towns});

        rootDiv.innerHTML = generatedHtml;
    }
})