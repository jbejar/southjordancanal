// Initialize AWS SDK
AWS.config.update({
    region: 'us-east-1' // Change to your region
});

const lambda = new AWS.Lambda();

// Chat interface functions
async function sendMessage(message) {
    try {
        const params = {
            FunctionName: 'genai-lambda',
            Payload: JSON.stringify({
                body: JSON.stringify({
                    prompt: message
                })
            })
        };

        const response = await lambda.invoke(params).promise();
        const result = JSON.parse(response.Payload);
        
        if (result.statusCode === 200) {
            const body = JSON.parse(result.body);
            return body.response;
        } else {
            throw new Error('Failed to get response from Lambda');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}