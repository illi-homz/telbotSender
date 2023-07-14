class TelBotSender {
    async sendMessage(event) {
        event.preventDefault();
        const botID = $('#botID').val().trim()
        const chatID = $('#chatID').val().trim()
        const text = $('#messageText').val().trim()

        if (!botID || !chatID || !text) return alert('Введите id или текст')

        const url = `https://api.telegram.org/bot${botID}/sendMessage`
        
        const data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({chat_id: chatID, text, parse_mode: 'markdown'})
        }).then(response => response.json())

        console.log('data', data)
        alert('Сообщение отправлено')
        $('#messageText').val('')
        localStorage.setItem('botID', botID)
        localStorage.setItem('chatID', chatID)
    }
}

const telBotSender = new TelBotSender()

$(document).ready(() => {
    const botID = localStorage.getItem('botID')
    const chatID = localStorage.getItem('chatID')
    botID && $('#botID').val(botID)
    chatID && $('#chatID').val(chatID)
})