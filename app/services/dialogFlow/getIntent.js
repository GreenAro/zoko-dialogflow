const moment = require("moment");
const logger = require("../../logger");
const dialogflow = require("dialogflow");
const axios = require("axios");
const sendMessage = require("../zoko/sendMessage");

const df_project_id = process.env.ZOKO_DIALOGFLOW_PROJECT_ID;
const df_client_email = process.env.ZOKO_DIALOGFLOW_CLIENT_EMAIL;
const df_private_key = process.env.ZOKO_DIALOGFLOW_PRIVATE_KEY;

const indianRailUrl = process.env.ZOKO_INDIANRAIL_URL;
const indianRailApiKey = process.env.ZOKO_INDIANRAIL_API_KEY;

exports.getIntent = async (requestBody) => {
  console.log("request body ", requestBody);
  const { text, customer } = requestBody;
  const sessionId = !!customer ? customer.id : requestBody.platformSenderId;

  const private_key = df_private_key.replace(/\\n/g, "\n");

  const config = {
    credentials: {
      private_key: private_key,
      client_email: df_client_email,
    },
  };

  const sessionClient = new dialogflow.SessionsClient(config);
  const sessionPath = sessionClient.sessionPath(df_project_id, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: text,
        languageCode: "en-US",
      },
    },
  };
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  console.log(`  Get Intent Response : ${JSON.stringify(responses)}`);
  console.log(
    `  Get Intent Response [0] : ${JSON.stringify(responses[0].queryResult)}`
  );
  console.log(`  Query Params: ${JSON.stringify(result.parameters)}`);

  return result;
};

exports.sendSimpleReply = async (intent) => {};

exports.sendReply = async (result) => {
  if (result) {
    const train =
      !!result.parameters &&
      !!result.parameters.fields &&
      !!result.parameters.fields.trainnum
        ? result.parameters.fields.trainnum.stringValue
        : 0;

    const headers = {
      "Content-Type": "application/json",
    };

    const today = moment(new Date()).format("YYYYMMDD");

    const url = `${indianRailUrl}/livetrainstatus/apikey/${indianRailApiKey}/trainnumber/${train}/date/${today}`;

    console.log(`  Train URL : ${url}`);

    await axios({
      method: "get",
      url,
      headers,
    })
      .then(function(response) {
        console.log(
          `  Response from train: ${JSON.stringify(
            response.data.CurrentStation
          )}`
        );
        const { data } = response;

        if (!!data && !!data.CurrentStation) {
          const delayed =
            !!data.CurrentStation.DelayInArrival &&
            data.CurrentStation.DelayInArrival != "0M";
          var replyText = `Train ${train} has reached ${data.CurrentStation.StationName}(${data.CurrentStation.StationCode}) at ${data.CurrentStation.ActualArrival}`;
          if (delayed)
            replyText = `${replyText} with a delay of ${data.CurrentStation.DelayInArrival}`;

          sendMessage.sendTextMessage(requestBody.platformSenderId, replyText);
        }
      })
      .catch(function(error) {
        logger.error("Error Config => " + JSON.stringify(error));
      });
  }
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }

  return result;
};
