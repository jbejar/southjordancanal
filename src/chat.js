import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import outputs from '@/amplify_outputs.json';

Amplify.configure(outputs);

const client = generateClient();  
// const { data, errors } = await client.queries.generateHaiku({
//     prompt
//   });
let addMessage;
export default function useChat(cb) {
    addMessage = cb;
    return handleUserMessage;
}

function handleUserMessage(message) {
    // Add user message to chat
    addMessage(message, true);
    
    // Simple response logic - you can expand this
    let response;
    if (message.toLowerCase().includes('water')) {
        response = "The watering season is from April 15 to October 15. For specific questions, please contact your Weir Master.";
    } else if (message.toLowerCase().includes('fee')) {
        response = "Transfer fee is $200. For detailed fee information, please check the fees table on our website.";
    } else if (message.toLowerCase().includes('contact')) {
        response = "You can contact our Secretary Annette Bejarano at annbejar@comcast.net";
    } else {
        response = "For specific inquiries, please email us. You can expect a response within 1-2 weeks.";
    }
    
    // Add bot response after a short delay
    setTimeout(() => addMessage(response), 500);
}