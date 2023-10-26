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

module.exports = {convertJsonToString, writeToJson}