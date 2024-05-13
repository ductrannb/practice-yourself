<template>
  <div class="popup-chat-container">
    <Transition name="bounce">
      <div v-if="isShowPopupChat" class="popup-chat-messages-box" v-click-outside="closePopup">
        <div v-if="chatId != null">
          <div class="popup-chat-messages-list" ref="chatContainer">
            <div
                :class="{
                  'chat-message': true,
                  'chat-message--user': message.role === 'user',
                  'chat-message--model': message.role === 'model',
                }"
                v-for="(message, index) in chat.messages"
                :key="index">
              <p v-if="message.role === 'user'">{{ message.text }}</p>
              <div v-else v-html="convertModelMessage(message.text)"></div>
            </div>
            <div class="typing-container" v-if="modelTyping">
              <li class="ball"></li>
              <li class="ball"></li>
              <li class="ball"></li>
            </div>
          </div>
          <div class="popup-chat-messages-box--footer">
            <textarea type="text" v-model="message" ref="areaMessage" placeholder="Nhập tin nhắn" rows="1"/>
            <div class="popup-chat-messages--button-send" @click="sendMessage">
              <img src="/images/icons/send-message.svg">
            </div>
          </div>
        </div>
        <div v-else class="popup-chat-messages--none">
          <div>Bạn chưa có cuộc trò chuyện</div>
          <button @click="startNewChat">Bắt đầu</button>
        </div>
      </div>
    </Transition>
    <div class="popup-chat-icon-box" @click="togglePopupChat">
      <div class="popup-chat-icon">
        <img src="/images/icons/icon-chat-ai.png">
      </div>
      <span v-if="!isShowPopupChat">Hỏi đáp với AI</span>
    </div>
  </div>
</template>

<script>
import katex from "katex"
export default {
  name: "PopupChatGemini",
  props: {
    chatId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isShowPopupChat: false,
      message: null,
      modelTyping: false,
      chat: {
        chat_session: null,
        messages: []
      }
    }
  },
  watch: {
    chatId(newVal) {
      if (newVal != null) {
        this.fetchData()
      }
    },
    isShowPopupChat(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.areaMessage.focus()
        })
      }
    }
  },
  updated() {
    this.scrollToBottom();
  },
  methods: {
    togglePopupChat() {
      this.isShowPopupChat = !this.isShowPopupChat
    },
    closePopup() {
      this.isShowPopupChat = false
    },
    async startNewChat() {
      const res = await this.$axios.post(`home/lessons/start-chat/${this.$route.params.id}`)
      this.chat = res.data.data
      this.$emit('update-chat-id', this.chat.chat_session)
    },
    async fetchData() {
      const res = await this.$axios.get(`gemini/${this.chatId}`)
      this.chat = res.data.data
    },
    async sendMessage() {
      if (this.message != null && this.message.trim() !== '') {
        this.chat.messages.push({text: this.message, role: 'user'})
        this.modelTyping = true
        this.$axios.post('gemini/send-message', {
          chat_session: this.chat.chat_session,
          message: this.message
        })
            .then(res => {
              this.modelTyping = false
              this.chat.messages.push({text: res.data.data.message, role: 'model'})
              setTimeout(() => {
                this.scrollToBottom();
              }, 100)
            })
            .catch(error => {
              this.modelTyping = false
              console.log(error)
            })
        this.message = null
        setTimeout(() => {
          this.scrollToBottom();
        }, 100)
      }
    },
    convertModelMessage(message) {
      if (message.includes('$')) {
        message = message.replace('$$', '$')
        let matches = message.match(/\$(.*?)\$/g).map(function(val){
          return val.replace(/\$/g, '')
        })
        matches.forEach(match => {
          message = message.replace(`$${match}$`, katex.renderToString(match))
        })
      }
      let lines = message.split('\n');
      let html = '';
      lines.forEach(line => {
        if (line.startsWith('**') && line.endsWith('**')) {
          html += '<strong>' + line.substring(2, line.length - 2) + '</strong><br>'
        } else if (line.startsWith('* ')) {
          html += '<li>' + line.substring(2) + '</li>'
        } else if (line.startsWith('$') && line.endsWith('$')) {
          html += katex.renderToString(line)
        } else {
          html += '<p>' + line + '</p>'
        }
      })
      return html
    },
    scrollToBottom() {
      const container = this.$refs.chatContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }
}
</script>

<style scoped>
.popup-chat-container {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
}
.popup-chat-messages-box {
  border: 1px solid var(--color-main);
  border-radius: 8px;
  box-shadow: var(--color-main) 0px 1px 6px;
  background-color: #FFFFFF;
  overflow: hidden;
}
.popup-chat-messages-list {
  padding: 1rem 1rem 1rem .5rem;
  width: 600px;
  max-height: 50vh;
  min-height: 200px;
  overflow: auto;
}
.popup-chat-icon {
  width: 40px;
  height: 40px;
}
.popup-chat-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.chat-message {
  max-width: 90%;
  width: max-content;
  padding: .3rem .6rem;
  border-radius: 8px;
  margin-bottom: .5rem;
  font-size: .85rem;
}
.chat-message--user {
  background-color: var(--color-main);
  color: white;
  margin-left: auto;
}
.chat-message--model {
  background-color: #F0F0F0;
  margin-right: auto;
  position: relative;
  margin-left: 24px;
}
.chat-message--model::before,
.typing-container::before {
  content: '';
  display: inline-block;
  position: absolute;
  top: 3px;
  left: -24px;
  background-image: url("/images/icons/icon-chat-ai.png");
  background-size: contain;
  width: 20px;
  height: 20px;
}
.popup-chat-icon-box {
  display: flex;
  padding: .5rem 1rem;
  border: 1px solid var(--color-main);
  width: max-content;
  margin-top: 1rem;
  border-radius: 100px;
  column-gap: .5rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: auto;
  user-select: none;
}
.popup-chat-icon-box:hover {
  box-shadow: var(--color-main) 0px 1px 6px;
  background-color: #f8f7f7;
  color: var(--color-main);
  transition: color 0s;
}
.popup-chat-messages-box--footer {
  border-top: 1px solid var(--color-main);
  display: flex;
}
.popup-chat-messages-box--footer textarea {
  padding: .5rem;
  resize: none;
  font-size: .85rem;
  width: calc(100% - 50px);
  border-right: 1px solid var(--color-main);
}
.popup-chat-messages-box--footer textarea:focus-visible {
  outline: none;
}
.popup-chat-messages-box--footer textarea::-webkit-scrollbar {
  width: 2px;
}
.popup-chat-messages-list::-webkit-scrollbar {
  width: 8px;
}
.popup-chat-messages-box--footer textarea::-webkit-scrollbar-track,
.popup-chat-messages-list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #f8bc9b;
}
.popup-chat-messages-box--footer textarea::-webkit-scrollbar-thumb,
.popup-chat-messages-list::-webkit-scrollbar-thumb {
  background-color: var(--color-main);
  border-radius: 100px;
}
.popup-chat-messages-box--footer button {
  background-color: var(--color-main);
  border-radius: 100px;
}
.popup-chat-messages--button-send {
  width: 50px;
  padding: .5rem;
  display: flex;
  justify-content: center;
}
.popup-chat-messages--button-send img {
  width: 32px;
  height: 32px;
  cursor: pointer;
}
.bounce-enter-active {
  animation: bounce-in 0.3s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
.popup-chat-messages--none {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 5rem;
  height: 10rem;
}
.popup-chat-messages--none div {
  margin-bottom: 1rem;
}
.popup-chat-messages--none button {
  padding: .5rem;
  border-radius: 4px;
  border: 1px solid var(--color-main);
  font-size: .8rem;
  color: var(--color-main);
}
.popup-chat-messages--none button:hover {
  background-color: var(--color-main);
  color: white;
}
.typing-container {
  width: 50px;
  display: flex;
  justify-content: space-evenly;
  position: relative;
  margin-left: 1.5rem;
  background-color: #F0F0F0;
  height: 1.5rem;
  border-radius: 8px;
  align-items: center;
  padding: 0 5px;
}
.ball {
  list-style: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #000000;
}
.ball:nth-child(1) {
  animation: bounce-1 1.3s ease-in-out infinite;
}
@keyframes bounce-1 {
  50% {
    transform: translateY(-4px);
  }
}
.ball:nth-child(2) {
  animation: bounce-3 1.3s ease-in-out 0.3s infinite;
}
@keyframes bounce-2 {
  50% {
    transform: translateY(-4px);
  }
}
.ball:nth-child(3) {
  animation: bounce-3 1.3s ease-in-out 0.6s infinite;
}
@keyframes bounce-3 {
  50% {
    transform: translateY(-4px);
  }
}
</style>