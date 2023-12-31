const fs = require('fs');
// former data to send to server to  create a transaction
let json = {
    "goodsNm": "IPhone 11 Plus",
    "amount": "3000000",
    "userFee": "0",
    "payType": "NO",
    "bankCode": "",
    "windowColor": "#0061E3",
    "saveCard": "PAY_CREATE_TOKEN",
    "merId": "MGPDEMO001",
    "tokenId": ""
}


// function to convert json to body string
function convertJsonToString(json) {
    let result = "";
    for (let key in json) {
        result += key + "=" + json[key] + "&";
    }
    return result.slice(0, -1);
}

fetch("https://demo.megapay.vn/home/process", {
    "headers": {
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
        "Referrer-Policy": "no-referrer"
    },
    "body": convertJsonToString(json),
    "method": "POST"
}).then(res => res.json()).then(res => writeToJson(res.data))


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