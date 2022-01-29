require('dotenv').config();
const express = require('express')
const app = express();
const path = require('path')
const { readFileSync, writeFileSync } = require('fs');
const StatusCodes = require('http-status-codes')


app.use(express.static('public'))
app.use(express.json());


app.post('/save', async (req, res) => {
    console.log('in save');
    try {
        await writeFileSync('./notes.json', JSON.stringify(req.body), 'utf8');
    } catch (error) {
        console.log(error);
    }
    res.send('ok');
})

app.get('/getallnotes', async (req, res) => {
    const result = await readFileSync('./notes.json', 'utf8')
    res.status(200).json(result);
})







//---------------------------------------------
const port = process.env.PORT

const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is listening on post ${port}`);
        })

    } catch (error) {
        console.log(error);
    }
}


start();