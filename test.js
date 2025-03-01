import puppeteer from 'puppeteer';

async function run() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://developer.chrome.com/');

    await page.setViewport({ width: 1080, height: 1024 });

    // Aguarda o campo de busca estar visível
    await page.waitForSelector('.devsite-search-field', { visible: true });

    // Digita a pesquisa
    await page.type('.devsite-search-field', 'automate beyond recorder', { delay: 100 });

    // Pressiona Enter para pesquisar
    await page.keyboard.press('Enter');

    // Aguarda resultados carregarem
    await page.waitForSelector('.devsite-result-item-link', { visible: true , delay: 100 });

    // Clica no primeiro resultado
    await page.click('.devsite-result-item-link');

    // Aguarda o título da página de destino carregar
    await page.waitForSelector('h1');

    // Captura o título da página
    const fullTitle = await page.evaluate(() => {
        return document.querySelector('h1')?.textContent || "Título não encontrado";
    });

    console.log(`The title of this blog post is "${fullTitle}".`);

    await browser.close();
}

run().catch(console.error);
