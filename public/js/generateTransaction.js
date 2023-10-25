// This code aim to create a initial data for a valid transaction

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

function getUserDataForm() {
    var form = document.getElementById("userdataForm");
    var formData = {};

    for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
        if (element.type !== "submit") {
            formData[element.name] = element.value;
        }
    }
    return formData;
}


async function createTransaction() {
    userFormData = getUserDataForm();
    console.log(userFormData)
    bodyData = convertJsonToString(userFormData);
    transactionData = await fetch("/home/process", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        "body": JSON.stringify(userFormData),
        "method": "POST"
    }).then(res => res.json()).then(res => res.data)
    var form = document.getElementById("megapayForm");

    for (var key in transactionData) {
        if (transactionData.hasOwnProperty(key)) {
            var field = form.elements[key];
            if (field) {
                field.value = transactionData[key];
            }
        }
    }
    console.log(transactionData);
    // return transactionData;


}


