const AWS = require('aws-sdk');

exports.handler = async (event) => {
    // Initialize AWS Bedrock runtime client
    const bedrockRuntime = new AWS.BedrockRuntime();
    
    try {
        // Extract the prompt from the event
        const { prompt } = JSON.parse(event.body);
        
        // Prepare the request parameters for the model
        const params = {
            modelId: 'anthropic.claude-v2', // or another model of your choice
            body: JSON.stringify({
                prompt: prompt,
                max_tokens_to_sample: 2000,
                temperature: 0.7,
                top_p: 1,
                stop_sequences: ["\n\nHuman:"]
            }),
            contentType: 'application/json',
            accept: 'application/json'
        };
        
        // Invoke the model
        const response = await bedrockRuntime.invokeModel(params).promise();
        const result = JSON.parse(new TextDecoder().decode(response.body));
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                response: result.completion
            })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Failed to process the request'
            })
        };
    }
};