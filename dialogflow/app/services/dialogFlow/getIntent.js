const dialogflow = require("dialogflow");
const sendMessage = require("../zoko/sendMessage");

const df_project_id = process.env.ZOKO_DIALOGFLOW_PROJECT_ID;
const df_client_email = process.env.ZOKO_DIALOGFLOW_CLIENT_EMAIL;
const df_private_key = process.env.ZOKO_DIALOGFLOW_PRIVATE_KEY;

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
  console.log(
    `  Get Intent Response [0] : ${JSON.stringify(responses[0].queryResult)}`
  );
  console.log(`  Query Params: ${JSON.stringify(result.parameters)}`);

  const responseData = {
    recipient: requestBody.platformSenderId,
    text: await result.fulfillmentText,
  };
  return responseData;
};

exports.sendSimpleReply = async (reply) => {
  sendMessage.sendTextMessage(reply.recipient, reply.text);
};

exports.sendProcessedReply = async (intent) => {
  // process the intent from DialogFlow
  // send the response
  const reply = "hello there Mr.Bean";
  sendMessage.sendTextMessage(reply.recipient, reply.text);
};
