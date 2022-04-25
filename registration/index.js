var express = require("express")
var bodyParser = require("body-parser")
const http = require('http');
const { stringify } = require('querystring');
const { response } = require("express");

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/test', (req, res, next) => {
    const data = stringify(req.body);

    const options = {
        url: 'http://localhost',
        port: '8080',
        path: '/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const request = http.request(options, (response) => {
        let chunks_of_data = [];
        response.on('data', (fragments) => {
            chunks_of_data.push(fragments);
        });

        response.on('end', () => {
            let response_body = Buffer.concat(chunks_of_data);
            const msg = JSON.parse(response_body).message;
            const code = response.statusCode;
            console.log(msg);

            if (code == 200){
                return res.redirect('signup_success.html');
            }
            // else{
            //     alert(msg);
            // }
        });

        response.on('error', (error) => {
            console.log(error);
        });
    });

    request.on('error', (error) => {
        console.log('Error Code: ' + error.code);
        console.log('Error Message: ' + error.message);
    });

    request.write(data);
    request.end();
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
});

app.listen(3000);

console.log("Listening on PORT 3000");