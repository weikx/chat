const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

let connectedUser = []

io.on('connection', socket => {
  console.log('用户已加入')
  let currentUser
  updateUser()
  socket.on('login', (user, callback) => {
    connectedUser.push(user)
    currentUser = user
    updateUser()
    callback(true)
    io.emit('sendMsg', {
      user: currentUser,
      type: 1,
      msg: 'Joined',
      createTime: new Date()
    })
  })

  socket.on('sendMsg', msg => {
    // 监听用户发送消息
    io.emit('sendMsg', {
      user: currentUser,
      msg,
      createTime: new Date()
    })
  })

  socket.on('disconnect', () => {
    if (currentUser) connectedUser.splice(connectedUser.indexOf(currentUser), 1)
    updateUser()
    console.log('用户已经退出', connectedUser);
  })
  function updateUser() {
    io.emit('loadUser', connectedUser)
    console.log(connectedUser)
  }
})


http.listen(3081, () => console.log('listening on *:3081'))