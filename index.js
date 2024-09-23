const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); 

async function fetchLlamaInsights(userQuery) {
    const prompt = `The user asks: ${userQuery}. Please analyze and provide a response as an Hindi and English story teller.`;

    try {
        const response = await axios.post('https://llama.us.gaianet.network/v1/chat/completions', {
            model: 'llama',
            messages: [
                { role: 'system', content: 'You are a helpful story teller in hindi and english according to the choice of language of user and interest of user  that answers user queries and provide some amazing stories that are for kids under 8 years. No Adult Content (any kind)' },
                { role: 'user', content: prompt }
            ]
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching Llama Insights', error);
        return 'An error occurred while fetching insights.';
    }
}

app.post('/api/chat', async (req, res) => {
    const userQuery = req.body.query; 
    const insights = await fetchLlamaInsights(userQuery); 
    res.json({ reply: insights });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});