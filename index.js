import puppeteer from 'puppeteer';
import dotenv from 'dotenv';

//Carrega as váriaveis de arquivos .env
dotenv.config();

async function abrir_Navegador() {

    //Iniciando o Navegador
    const browser = await puppeteer.launch({ headless: false});

    //Criando o context(uma estrutura de tarefas)
    const context = await browser.defaultBrowserContext();
    //Criando uma aba dentro do context
    const page = await context.newPage();

    return {context, page};

}

async function acessar_WP(page) {


    // Obtendo credenciais do .env    
    const login = process.env.USER_LOGIN;
    const pass = process.env.USER_PASS;
    const site = process.env.SITE;    

    if (!login || !pass || !site) {
        console.error("Erro: Credenciais não definidas no arquivo .env");
        process.exit(1);
    }

    //Vá para o painel administrativo da ETEC PB
    await page.goto(site);

    //Preencha o campo user_login
    await page.locator('#user_login').fill(login);

    //Preenche o campo user_pass
    await page.locator('#user_pass').fill(pass);

    //Aperta no botão Acessar
    await page.click('input[name="wp-submit"]');
}

async function acessar_post(page, parametro){
    await page.click('#menu-posts');
    
}

async function run() {
    const {context, page } = await abrir_Navegador();
    await acessar_WP(page);
    //Fechar o navegador
    // await browser.close()
}

run().catch(console.error);
