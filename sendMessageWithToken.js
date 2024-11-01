const puppeteer = require('puppeteer');

async function loginWithTokenAndSendMessage() {
    const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    // Arahkan ke halaman utama Discord untuk setting token
    await page.goto('https://discord.com/channels/@me', { waitUntil: 'networkidle2' });

    // Masukkan token Discord secara langsung ke Local Storage
    const token = '1168933618933043271';  // Ganti dengan token Discord-mu
    await page.evaluate((token) => {
        window.localStorage.setItem('token', `"${token}"`);
    }, token);

    // Refresh halaman setelah memasukkan token
    await page.reload({ waitUntil: 'networkidle2' });

    // Buka channel yang ingin kamu kirimi pesan
    const channelUrl = 'https://discord.com/channels/@me/1122216075698909290'; // Ganti YOUR_CHANNEL_ID dengan ID channel yang kamu tuju
    await page.goto(channelUrl, { waitUntil: 'networkidle2' });

    // Tunggu sampai elemen input pesan muncul
    const messageInputSelector = 'div[role="textbox"]';
    await page.waitForSelector(messageInputSelector);

    // Isi dan kirim pesan
    const message = 'Halo, ini pesan otomatis dari Puppeteer di Discord menggunakan token!';
    await page.type(messageInputSelector, message);

    // Tekan Enter untuk mengirim
    await page.keyboard.press('Enter');

    console.log('Pesan berhasil dikirim ke channel Discord!');

    // Tutup browser
    await browser.close();
}

loginWithTokenAndSendMessage();
