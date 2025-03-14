import { defineFunction } from '@aws-amplify/backend';

export const genAi = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'gen-ai',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './genai-lambda.js'
});