import monkeys from './monkeys.js';

window.addEventListener('load', async () => {
    const mainEl = document.querySelector('section');
    
    const mainString = await (await fetch('./main-template.hbs')).text()
    const mainTemplate = Handlebars.compile(mainString);
    Handlebars.registerPartial('monkey', await (await fetch('./monkey.hbs')).text());
    
    const html = mainTemplate({ monkeys });
    mainEl.innerHTML = html;
    
    const monkeysEl = document.querySelector('.monkeys');
    monkeysEl.addEventListener('click', toggleShowInfo);
    
    function toggleShowInfo(e) {
        if(e.target.tagName === 'BUTTON') {
            const p = e.target.parentNode.querySelector('p');
            p.removeAttribute('style');
        }
    }
});