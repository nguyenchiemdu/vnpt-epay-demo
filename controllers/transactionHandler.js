const CallbackUrl = require("../models/callbackUrl");
const NotifyUrl = require("../models/notifyUrl");
async function transactionHandlerCallback(req, res, next) {
  body = req.body;
  console.log("callBackUrl");
  console.log(req.body);
  const newCallback = new CallbackUrl({
    body: body,
    query: req.query,
  });

  // Save the newCallback document to the CallbackUrl collection
  await newCallback.save();

  res.json({
    status: "success",
    message: "Success",
  });
}
async function transactionHandler(req, res, next) {
  body = req.body;
  console.log("notiUrl");
  console.log(req.body);
  const newNotify = new NotifyUrl({
    body: body,
    query: req.query,
  });

  // Save the newCallback document to the CallbackUrl collection
  await newNotify.save();
  res.json({
    status: "success",
    message: "Success",
  });
}
module.exports = { transactionHandlerCallback, transactionHandler };
