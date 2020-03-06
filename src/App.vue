<template>
  <div id="app" class="row site">
    <div class="sm-8 md-8 col">
      <div class="paper message-content border">
        <ul>
          <li>
            <span class="user-name">Chat Bot:</span>
            <span class="user-message margin-left-small">Welcome to my Chats. 🍊</span>
          </li>
          <!-- <li class="">Sagool joined.</li> -->
          <li :class="{desc: item.type == 1}" v-for="(item, index) in messageList" :key="index">
            <span class="user-name">{{item.user}}:</span>
            <span class="user-message margin-left-small">{{item.msg}}</span>
          </li>
        </ul>
      </div>
      <div class="row">
        <div class="col-9">
          <div class="form-group padding-small">
            <input class="input-block" type="text" v-model="messageText">
          </div>
        </div>
        <div class="col-3">
          <!-- Send Message Btn -->
          <button class="btn-block" v-if="logined" @click="sendMsg">Send</button>
          <label class="paper-btn" for="input-name-modal" v-else>Send</label>
          <input class="modal-state" id="input-name-modal" type="checkbox">
          <!-- Show Typeing name Modal -->
          <div class="modal">
            <label class="modal-bg" for="input-name-modal"></label>
            <div class="modal-body">
              <label class="btn-close" for="input-name-modal">X</label>
              <h4 class="modal-title">Please input your name</h4>
              <h5 class="modal-subtitle">Use English Please</h5>
              <p class="modal-text">Please enter a nickname before sending a message</p>
              <div class="row">
                <input class="input-block" type="text" v-model="username">
                <label for="input-name-modal" class="paper-btn margin-left-small" @click="login">Ok</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sm-4 md-4 col sidebar">
      <div class="paper connected-user border">
        Connected User
        <ol>
          <li>Chat Bot</li>
          <li v-for="item in userList" :key="item">{{item}}</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      logined: false,
      username: '',
      messageText: '',
      messageList: [],
      userList: []
    }
  },
  methods: {
    login () {
      if (!this.username) return alert('请输入用户名')
      this.$socket.emit('login', 
        this.username, () => {
        this.logined = true 
      })
    },
    sendMsg () {
      if (!this.messageText) return alert('请输入消息内容')
      this.$socket.emit('sendMsg', this.messageText)
      this.messageText = ''
    }
  },
  created () {
    this.sockets.subscribe('loadUser', users => {
      console.log('loadUser', users)
      this.userList = users
    })

    this.sockets.subscribe('sendMsg', msg => {
      this.messageList.push(msg)
    })
  },
  components: {
  }
}
</script>

<style>
#app {
  max-width: 800px;
}
.message-content {
  height: 60vh;
  overflow-y: scroll;
}
::-webkit-scrollbar {
  color: transparent;
}
.connected-user {
  max-height: 85vh;
  overflow-y: scroll;
}
.paper-btn {
  display: block !important;
  text-align: center !important;
}
.user-name {
  color: #999;
}

.desc {
  list-style: none !important;
  font-size: 14px;
  text-align: center;
  background: #eee;
  border-radius: 3px;
  padding: 5px 0;
  margin: 5px 0;
  color: #999;
}
/* .desc::before {
  content: '';
  display: none;
} */
</style>
