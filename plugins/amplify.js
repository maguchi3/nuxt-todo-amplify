import Vue from "vue";
import Amplify from "aws-amplify";
import "@aws-amplify/ui-vue";

Amplify.configure({
  aws_project_region: process.env.AWS_PROJECT_REGION,
  aws_cognito_identity_pool_id: process.env.AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: process.env.AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.AWS_USER_POOLS_WEB_CLIENT_ID,
  oauth: {},
  aws_appsync_graphqlEndpoint: process.env.AWS_APPSYNC_GRAPHQL_ENDPOINT,
  aws_appsync_region: process.env.AWS_APPSYNC_REGION,
  aws_appsync_authenticationType: process.env.AWS_APPSYNC_AUTHENTICATION_TYPE,
  aws_appsync_apiKey: process.env.AWS_APPSYNC_APIKEY
});
Vue.use(Amplify);
