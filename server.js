const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/home/process', async (req, res) => {
    let isEW = false
    let bankCode = req.body.bankCode;
    if (req.body.payType == 'EW') {
        isEW = true;
        req.body.payType = 'NO';
    }
    var config = {
        method: 'post',
        url: "https://demo.megapay.vn/home/process",
        headers: {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "vi,en-US;q=0.9,en;q=0.8,ru;q=0.7,zh-TW;q=0.6,zh;q=0.5",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Chromium\";v=\"118\", \"Google Chrome\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "ci_session=34uck1b34o3cd7c51k22iken5uk63eof",
            "Referer": "https://demo.megapay.vn/all-payment-methods/iphone-11-plus",
            "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        data: convertJsonToString(req.body)
    };
    transactionData = await axios(config)
        .then(function (response) {
            data = response.data.data;
            console.log(response)
            return data;
        })
        .catch(function (error) {
            console.log(error);
        });
    if (isEW) {
        transactionData.payType = 'EW';
        transactionData.bankCode = bankCode;
    }
    res.json({
        "data": transactionData,
        "status": "success",
        "message": "Success"
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

//function to convert json to body string
function convertJsonToString(json) {
    let result = "";
    for (let key in json) {
        result += key + "=" + json[key] + "&";
    }
    return result.slice(0, -1);
}


function writeToJson(data) {
    const jsonData = JSON.stringify(data, null, 2);
    let filePath = './transaction.json';
    try {
        fs.writeFileSync(filePath, jsonData, 'utf-8');
        console.log('Transaction has been written to ' + filePath);
    } catch (error) {
        console.error('Error writing to the file:', error);
    }
}



