const axios = require("axios");
const { convertJsonToString } = require("../common");
const Transaction = require("../models/transaction");

const createTransactionConfig = {
  url: "https://demo.megapay.vn/home/process",
  headers: {
    accept: "application/json, text/javascript, */*; q=0.01",
    "accept-language": "vi,en-US;q=0.9,en;q=0.8,ru;q=0.7,zh-TW;q=0.6,zh;q=0.5",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-ch-ua":
      '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    cookie: "ci_session=34uck1b34o3cd7c51k22iken5uk63eof",
    Referer: "https://demo.megapay.vn/all-payment-methods/iphone-11-plus",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
};

async function createDemoTransaction(req, res) {
  let isEW = false;
  let bankCode = req.body.bankCode;
  if (req.body.payType == "EW") {
    isEW = true;
    req.body.payType = "NO";
  }
  var config = {
    method: "post",
    url: createTransactionConfig.url,
    headers: createTransactionConfig.headers,
    data: convertJsonToString(req.body),
  };
  transactionData = await axios(config)
    .then(function (response) {
      data = response.data.data;
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });
  if (isEW) {
    transactionData.payType = "EW";
    transactionData.bankCode = bankCode;
  }
  transactionData.payOption = req.body.payOption;
  transactionData.userId = "6539d6cf197f81e8317056f7";
  console.log(transactionData);
  res.json({
    data: transactionData,
    status: "success",
    message: "Success",
  });
}
async function createTransaction(req, res) {
  let transaction = req.body;
  for (let key in transaction) {
    if (transaction[key] == "") {
     transaction[key] = null;
    }
  }
  console.log(transaction);
  const newTransaction = new Transaction({
    userId: transaction["userId"],
    amount: transaction.amount,
    currency: transaction.currency,
    payType: transaction.payType,
    bankCode: transaction.bankCode,
    payOption: transaction.payOption,
  });

  // Save the newCallback document to the CallbackUrl collection
  await newTransaction.save();
  res.json({
    data: newTransaction,
    status: "success",
    message: "Success",
  });
}


module.exports = { createDemoTransaction,createTransaction };
