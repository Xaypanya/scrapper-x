const puppeteer = require('puppeteer')
const fs = require('fs');

const url = "https://www.animekub.com/play/5170/"
const realMp4Urls = []

async function run(myUrl){
    const browser = await puppeteer.launch('--disable-web-security',
    '--disable-features=IsolateOrigins,site-per-process');
    const page = await browser.newPage();
    await page.goto(myUrl);

    // const episodes = await page.evaluate(()=>Array.from(document.querySelectorAll('p a'),(el)=>({"title": el.innerHTML.replace("Courage The Cowardly Dog ",""), "link": el.href})))
    const episodesDarkPlayerUrl = await page.evaluate(()=>Array.from(document.querySelectorAll('p a'),(el)=>el.href))
    
    // const json = JSON.stringify(episodes,null,2)
    // fs.writeFileSync("./episodes.json", json)
    
    for (let i = 0; i < episodesDarkPlayerUrl.length; i++) {
        const url = episodesDarkPlayerUrl[i];
        await page.goto(url, {waitUntil: "networkidle2"});

        const title = await page.evaluate(()=>document.getElementsByClassName('hny-title')[0].innerText.replace("COURAGE THE COWARDLY DOG ",""))
        
        const elementHandle = await page.waitForSelector('iframe');
        const frame = await elementHandle.contentFrame();
    
        const videolink = await frame.evaluate(()=>document.getElementsByClassName("embed-responsive-item")[0].src)
        realMp4Urls.push({"link":videolink, "ep": i+1, "title": title.replace(" พากย์ไทย","")})
        console.log(realMp4Urls)
        
    }
    
    const json = JSON.stringify(realMp4Urls,null,2)
    fs.writeFileSync("./realMp4Urls.json", json)

    await browser.close();
}

run(url)
