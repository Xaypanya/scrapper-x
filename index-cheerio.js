const cheerio = require('cheerio');
const axios = require('axios');
const j2cp = require('json2csv').Parser;
const fs = require('fs')

const url = "https://www.animekub.com/play/5170/"
const episode_data = []
const episode_video_data = []

async function getEpisodeUrl(linkUrl){
    try{

        const response = await axios.get(linkUrl,{
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Accept-Encoding": "*",
            },
          });
        const $=cheerio.load(response.data);
        const episode = $("p");

        episode.map((i, card)=>{
            title = $(card).find("a").text().replace("Courage The Cowardly Dog ","");
            link = $(card).find("a").attr('href');
            // console.log("title====>",title)
            episode_data.push({title, link})
        })

        // console.log("episode :::", episode)
        console.log("episode_data :::", episode_data)

        const parser = new j2cp();
        const csv = parser.parse(episode_data)
        // fs.writeFileSync("./episodes.csv", csv)
    }
    catch(error){
        console.error("error :::", error)
    }
}

async function getEpisodeVideoUrl(linkUrl){
    try{

        const response = await axios.get(linkUrl,{
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Accept-Encoding": "*",
            },
          });
        const $=cheerio.load(response.data);
        const episode = $("p");

        episode.map((i, card)=>{
            title = $(card).find("a").text().replace("Courage The Cowardly Dog ","");
            link = $(card).find("a").attr('href');
            // console.log("title====>",title)
            episode_data.push({title, link})
        })

        // console.log("episode :::", episode)
        console.log("episode_data :::", episode_data)

        const parser = new j2cp();
        const csv = parser.parse(episode_data)
        fs.writeFileSync("./episodes.csv", csv)
    }
    catch(error){
        console.error("error :::", error)
    }
}

getEpisodeUrl(url)