const axios = require('axios');

module.exports.config = {
    name: "gemini",
    version: "1.0.0",
    hasPermission: 0,
    credits: "CJ Villavito",//api by jerome
    description: "Gemini AI Bot",
    hasPrefix: true,
    commandCategory: "Gemini Pro",
    cooldowns: 3,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const { messageID, messageReply } = event;
        let prompt = args.join(' ');

        if (messageReply) {
            const repliedMessage = messageReply.body;
            prompt = `${repliedMessage} ${prompt}`;
        }

        if (!prompt) {
            return api.sendMessage('ℹ Please type a question.', event.threadID, messageID);
        }
        api.sendMessage('🔍 Please wait...', event.threadID);

        // Delay
        await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust the delay time as needed

        const gpt4_api = `https://joshweb.click/new/gemini?prompt=${encodeURIComponent(prompt)}`;

        const response = await axios.get(gpt4_api);

        if (response.data && response.data.response) {
            const generatedText = response.data.response;

            // Ai Answer Here
            api.sendMessage(`🔮 Gemini Pro ( 𝐀𝐈 )\n━━━━━━━━━━━━━━━━\n📝 answer: ➪ ${generatedText}\n━━━━━━━━━━━━━━━━\n❇`, event.threadID, messageID);
        } else {
            console.error('API response did not contain expected data:', response.data);
            api.sendMessage(`❌ 𝙰𝙽 𝙴𝚁𝚁𝙾𝚁 𝙾𝙲𝙲𝚄𝚁𝚁𝙴𝙳 𝚆𝙷𝙸𝙻𝙴 𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙸𝙽𝙶 𝚃𝙷𝙴 𝚃𝙴𝚇𝚃 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴. 𝙿𝙻𝙴𝙰𝚂𝙴 𝚃𝚁𝚈 𝙰𝙶𝙰𝙸𝙽 𝙻𝙰𝚃𝙴𝚁. 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴 𝙳𝙰𝚃𝙰: ${JSON.stringify(response.data)}`, event.threadID, messageID);
        }
    } catch (error) {
        console.error('Error:', error);
        api.sendMessage(`❌  error occurred while generating the text response. Please try again later. Error details: ${error.message}`, event.threadID, event.messageID);
    }
};
