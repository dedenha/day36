const puppeteer = require('puppeteer');

async function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function loginAndSendMessage() {
    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    const mainUrl = 'https://discord.com';
    await page.goto(mainUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    console.log('Navigated to Discord homepage.');

    await delay(6000);

    // URL untuk login Discord
    const loginUrl = 'https://discord.com/login';
    await page.goto(loginUrl, { waitUntil: 'networkidle2' });

    // Isi kredensial login Discord
    const email = 'dedenha20@gmail.com';
    const password = '12+tes12+';

    // Isi email
    await page.type('input[name="email"]', email);
    await page.type('input[name="password"]', password);

    // Klik tombol login
    await page.click('button[type="submit"]');

    // Tunggu halaman untuk beralih setelah login
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Buka channel yang ingin kamu kirimi pesan
    const channelUrl = 'https://discord.com/channels/1122216074730016849/1122216075698909290';
    await page.goto(channelUrl, { waitUntil: 'networkidle2' });

    // Tunggu sampai elemen input pesan muncul
    const messageInputSelector = 'div[role="textbox"]';
    await page.waitForSelector(messageInputSelector);

    // Isi dan kirim pesan
    const message = 'Halo, ini pesan otomatis dari Puppeteer di Discord!';
    await page.type(messageInputSelector, message);

    // Tekan Enter untuk mengirim
    await page.keyboard.press('Enter');

    console.log('Pesan berhasil dikirim ke channel Discord!');

    // Tutup browser
    await browser.close();
}

loginAndSendMessage();