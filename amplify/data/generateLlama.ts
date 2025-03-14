import type { Schema } from "./resource";
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
  InvokeModelCommandInput,
} from "@aws-sdk/client-bedrock-runtime";

// initialize bedrock runtime client
const client = new BedrockRuntimeClient();
const system = require("./system.txt");

export const handler: Schema["generateLlama"]["functionHandler"] = async (
  event,
  context
) => {
  // User prompt
  const prompt = event.arguments.prompt;

  // Invoke model
  const input = {
    modelId: process.env.MODEL_ID,
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
        "prompt": `<|begin_of_text|><|start_header_id|>system<|end_header_id|>
    ${system}<|eot_id|><|start_header_id|>user<|end_header_id|>
    ${[prompt]}<|eot_id|><|start_header_id|>assistant<|end_header_id|>`,
        "temperature": 0.08,
        "top_p": 0.9,
        "max_gen_len": 100
    }),
  } as InvokeModelCommandInput;

  const command = new InvokeModelCommand(input);

  const response = await client.send(command);

  // Parse the response and return the generated haiku
  const data = JSON.parse(Buffer.from(response.body).toString());

  return data.content[0].text;
};