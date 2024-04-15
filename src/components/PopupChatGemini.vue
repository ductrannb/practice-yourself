<template>
  <div class="popup-chat-container">
    <Transition name="bounce">
      <div v-if="isShowPopupChat" class="popup-chat-messages-box" v-click-outside="closePopup">
        <div class="popup-chat-messages-list">
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
        </div>
        <div class="popup-chat-messages-box--footer">
          <textarea type="text" placeholder="Nhập tin nhắn" rows="1"/>
          <div class="popup-chat-messages--button-send">
            <img src="/images/icons/send-message.svg">
          </div>
        </div>
      </div>
    </Transition>
    <div class="popup-chat-icon-box" @click="togglePopupChat">
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
      isShowPopupChat: false,
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
            text: 'Chiến tranh giữa các vì sao đã truyền cảm hứng cho nhân viên AT-AT, được vẽ bằng cách sử dụng văn bản với màu sắc được tô điểm trong CSS. Một hiệu ứng funky.',
            role: 'user',
          },
          {
            id: '5a62827f-02d8-46c9-9ec7-748252751b66',
            text: 'Chiến tranh giữa các vì sao đã truyền cảm hứng cho nhân viên AT-AT, được vẽ bằng cách sử dụng văn bản với màu sắc được tô điểm trong CSS. Một hiệu ứng funky.',
            role: 'user',
          },
          {
            id: '5a62827f-02d8-46c9-9ec7-748252751b66',
            text: 'Chiến tranh giữa các vì sao đã truyền cảm hứng cho nhân viên AT-AT, được vẽ bằng cách sử dụng văn bản với màu sắc được tô điểm trong CSS. Một hiệu ứng funky.',
            role: 'user',
          },
          {
            id: '5a62827f-02d8-46c9-9ec7-748252751b66',
            text: 'Chiến tranh giữa các vì sao đã truyền cảm hứng cho nhân viên AT-AT, được vẽ bằng cách sử dụng văn bản với màu sắc được tô điểm trong CSS. Một hiệu ứng funky.',
            role: 'user',
          },
          {
            id: '5a62827f-02d8-46c9-9ec7-748252751b66',
            text: 'Chiến tranh giữa các vì sao đã truyền cảm hứng cho nhân viên AT-AT, được vẽ bằng cách sử dụng văn bản với màu sắc được tô điểm trong CSS. Một hiệu ứng funky.',
            role: 'user',
          },
          {
            id: '5a62827f-02d8-46c9-9ec7-748252751b66',
            text: 'Chiến tranh giữa các vì sao đã truyền cảm hứng cho nhân viên AT-AT, được vẽ bằng cách sử dụng văn bản với màu sắc được tô điểm trong CSS. Một hiệu ứng funky.',
            role: 'user',
          },
          {
            id: '5a62827f-02d8-46c9-9ec7-748252751b66',
            text: 'Chiến tranh giữa các vì sao đã truyền cảm hứng cho nhân viên AT-AT, được vẽ bằng cách sử dụng văn bản với màu sắc được tô điểm trong CSS. Một hiệu ứng funky.',
            role: 'user',
          },
          {
            id: '5a62827f-02d8-46c9-9ec7-748252751b66',
            text: 'Dạ, bạn cần giúp gì ạ?',
            role: 'model',
          }
        ]
      }
    }
  },
  methods: {
    togglePopupChat() {
      this.isShowPopupChat = !this.isShowPopupChat
    },
    closePopup() {
      this.isShowPopupChat = false
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
  max-width: 80%;
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
</style>