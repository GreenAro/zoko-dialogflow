# Zoko DialogFlow Integration
Dialogflow connection - Custom Fulfillment

## Setup
- Update the `.env` or `.env.development` depending on the environment with relevant account details. 
> Docker sets up the environment as `production`. So if you are using docker deployment, make sure `.env` is populated.
- Create docker image `docker build -t <image-tag> .`
- Run the container `docker run -p 8081:8081 <image-tag>`

