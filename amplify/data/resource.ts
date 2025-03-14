// https://docs.amplify.aws/javascript/build-a-backend/data/custom-business-logic/connect-bedrock/
import {
    type ClientSchema,
    a,
    defineData,
    defineFunction,
  } from "@aws-amplify/backend";
  
  export const MODEL_ID = "meta.llama3-8b-instruct-v1:0";
  
  export const generateLlamaFunction = defineFunction({
    entry: "./generateLlama.ts",
    environment: {
      MODEL_ID,
    },
  });
  
  const schema = a.schema({
    generateLlama: a
      .query()
      .arguments({ prompt: a.string().required() })
      .returns(a.string())
      .authorization((allow) => [allow.publicApiKey()])
      .handler(a.handler.function(generateLlamaFunction)),
  });
  
  export type Schema = ClientSchema<typeof schema>;
  
  export const data = defineData({
    schema,
    authorizationModes: {
      defaultAuthorizationMode: "apiKey",
      apiKeyAuthorizationMode: {
        expiresInDays: 30,
      },
    },
  });