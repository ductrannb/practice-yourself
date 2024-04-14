<template>
  <div class="popup-chat-container">
    <div class="popup-chat-messages-box">
      <div
        :class="{
          'chat-message': true,
          'chat-message--user': message.role === 'user',
          'chat-message--model': message.role === 'model',
        }"
        v-for="(message, index) in chat.messages"
        :key="index"
      >
        {{ message.text }}
      </div>
      <div class="popup-chat-messages-box--footer">
        <input type="text" placeholder="Nhập tin nhắn">
        <button>Gửi</button>
      </div>
    </div>
    <div class="popup-chat-icon-box">
      <div class="popup-chat-icon">
        <img src="/images/icons/icon-chat-ai.png">
      </div>
      <span>Hỏi đáp với AI</span>
    </div>
  </div>
</template>

<script>
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
      chat: {
        id: '5a62827f-02d8-46c9-9ec7-748252751b66',
        messages: [
          {
            id: '5a62827f-02d8-46c9-9ec7-748252751b66',
            text: 'Chào bạn!',
            role: 'user',
          },
          {
            id: '5a62827f-02d8-46c9-9ec7-748252751b66',
            text: 'Chào bạn! Mình có thể giúp gì cho bạn?',
            role: 'model',
          },
          {
            id: '5a62827f-02d8-46c9-9ec7-748252751b66',
            text: 'Mình muốn hỏi về bài toán vẽ đồ thị hàm số',
            role: 'user',
          },
          {
            id: '5a62827f-02d8-46c9-9ec7-748252751b66',
            text: 'Dạ, bạn cần giúp gì ạ?',
            role: 'model',
          },
        ]
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
  padding: 1rem;
  border-radius: 8px;
  box-shadow: var(--color-main) 0px 1px 6px;
  background-color: #FFFFFF;
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
  max-width: 60%;
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
.chat-message--model::before {
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
</style>