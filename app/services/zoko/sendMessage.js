const axios = require("axios");
const logger = require("../../logger");

exports.sendTextMessage = async (user, msg) => {
  const SEND_MESSAGE_URL = process.env.ZOKO_API_MESSAGE_URL;
  const apiKey = process.env.ZOKO_TEST_API_KEY;

  const headers = {
    "Content-Type": "application/json",
    apikey: apiKey
  };

  const data = {
    channel: "whatsapp",
    recipient: !!user && user.length > 0 ? user.substr(1) : "",
    type: "text",
    message: msg
  };
  await axios({
    method: "post",
    url: SEND_MESSAGE_URL,
    data: data,
    headers
  })
    .then(function(response) {
      logger.debug(response.data);
      console.log("response from zoko api - ", response.data);
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        logger.error("Error Status => " + error.response.status);
        logger.error("Error Data => " + JSON.stringify(error.response.data));
        logger.error(
          "Error Response => " + JSON.stringify(error.response.headers)
        );
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        logger.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        logger.error("Error", error.message);
      }
      logger.error("Error Config => " + JSON.stringify(error.config));
    });
};

exports.updateMessageOnZoko = async requestBody => {
  const SEND_MESSAGE_URL = process.env.ZOKO_API_MESSAGE_URL;
  const restApiKey = process.env.ZOKO_API_ACCESS_KEY;

  const headers = {
    "Content-Type": "application/json",
    restApiKey: restApiKey
  };
  await axios({
    method: "put",
    url: `${SEND_MESSAGE_URL}/${requestBody.platformMessageId}/status`,
    data: requestBody,
    headers
  })
    .then(function(response) {
      logger.debug("updated message - ", response.data);
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        logger.error("Error Status => " + error.response.status);
        logger.error("Error Data => " + JSON.stringify(error.response.data));
        logger.error(
          "Error Response => " + JSON.stringify(error.response.headers)
        );
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        logger.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        logger.error("Error", error.message);
      }
      logger.error("Error Config => " + JSON.stringify(error.config));
    });
};
