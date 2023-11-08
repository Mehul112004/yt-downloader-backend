import ytdl from "ytdl-core";
import express from "express";
import axios from "axios";
import cors from "cors"
import cheerio from "cheerio";
import fs from "fs";

const app = express();

app.use(cors())

app.use(express.urlencoded({ extended: true }));

app.post("/api/send/audio", (req, res) => {
    console.log("Server hit");
    const url = req.body.url;
    console.log(url);
    if (url) {
        
        const getAudio = async () => {

            const response = await axios.get(url)
            const html = response.data
            const $ = cheerio.load(html)
            let title = $("head").find("title").text()
            console.log(title, typeof title);
            title=title.slice(0,30);
            console.log(title, typeof title);
            res.setHeader("Content-Type", "audio/mpeg");
            res.setHeader(`Content-Disposition`, `attachment; filename=${title}.mp3`);
            const audio = ytdl(url, { quality: 'highestaudio' });
            // await audio.pipe(fs.createWriteStream(`audio.mp3`))
            audio.pipe(res);
            audio.on("data",(data)=>{
                console.log(data);
            })
            audio.on("finish", () => {
                console.log("Piped!!!!!")
                // res.download(`./audio.mp3`,`${title}.mp3`)
            })
            audio.on("error", (err) => {
                console.log("Error: " + err);
            })
        }
        getAudio();
    }
})

app.post("/api/send/video", (req, res) => {
    console.log("Server hit");
    const url = req.body.url;
    console.log(url);
    if (url) {
        
        const getAudio = async () => {

            const response = await axios.get(url)
            const html = response.data
            const $ = cheerio.load(html)
            let title = $("head").find("title").text()
            console.log(title, typeof title);
            title=title.slice(0,30);
            console.log(title, typeof title);
            res.setHeader("Content-Type", "video/mp4");
            res.setHeader(`Content-Disposition`, `attachment; filename=${title}.mp4`);
            const audio = ytdl(url, { quality: '18' });
            // await audio.pipe(fs.createWriteStream(`audio.mp3`))
            audio.pipe(res);
            audio.on("data",(data)=>{
                console.log(data);
            })
            audio.on("finish", () => {
                console.log("Piped!!!!!")
                // res.download(`./audio.mp3`,`${title}.mp3`)
            })
            audio.on("error", (err) => {
                console.log("Error: " + err);
            })
        }
        getAudio();
    }
})

app.listen(3000, (err) => {
    if (err) console.log("Error");;
    console.log("The server is up and running.")
})
