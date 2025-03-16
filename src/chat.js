import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import outputs from '@/amplify_outputs.json';

Amplify.configure(outputs);

const client = generateClient();  
let addMessage;
const messages = [];
export default function useChat(cb) {
    addMessage = cb;
    return handleUserMessage;
}

async function handleUserMessage(message) {
    // Add user message to chat
    messages.push({ isUser: true, prompt: message });
    addMessage(message, true);
    const { data, errors } = await client.queries.generateLlama({
        messages: JSON.stringify(messages)
    });
    if(!errors) {
        const response = parseLlama(data);
        messages.push({ isUser: false, prompt: response });
        addMessage(response);
    } else {
        console.error(errors);
    }
}
// take in "{generation=<|start_header_id|>assistant<|end_header_id|>\n\nThe water turns on April 15., prompt_token_count=743, generation_token_count=13, stop_reason=stop}" and returns just the response
function parseLlama(response) {
    return response.split('\n\n')[1].split(", prompt_token_count")[0];
}