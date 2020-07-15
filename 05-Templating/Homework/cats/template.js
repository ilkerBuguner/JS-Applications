window.addEventListener('load', async () => {
    const allCatsDiv = document.querySelector('#allCats');

    const catsMainTemplateString = await (await fetch('./cats-main-template.hbs')).text()
    Handlebars.registerPartial('cat', await (await fetch('./cat.hbs')).text());
    const mainTemplate = Handlebars.compile(catsMainTemplateString);

    const html = mainTemplate({cats});
    allCatsDiv.innerHTML = html;
    
    allCatsDiv.addEventListener('click', toggleShowInfo);

    function toggleShowInfo(e) {
        if(e.target.tagName === 'BUTTON') {
            const divToToggle = e.target.parentNode.querySelector('.status');

            if(divToToggle.style.display == 'none') {
                divToToggle.removeAttribute('style');
            } else {
                divToToggle.style.display = 'none';
            }
        }
    }
});