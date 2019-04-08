const { Router } = require('express')
const Mock = require('mockjs')
const router = new Router()
const userInfo = (loginName) => {
  let displayName = '@cname'
  let role = -1
  switch(loginName){
    case 'admin':
      displayName = '管理员'
      role = 0
      break
    case 'guest':
      displayName = '游客'
      role = 1
      break
    default:
      role = 2
      break
  }
  return Mock.mock({
    code: 200,
    data: {
      role,
      displayName,
      status: 1,
      id: '@id',
      token: '@uuid',
      avatar: '@img(48x48, @color)',
    }
  })
}
router
  .post('/api/v1/user/login', (req, res) => {
    const {userName,password} = req.body
    if(userName === 'admin' && password === 'admin'){
      res.json(userInfo('admin'))
    }else if(userName === 'guest' && password === 'guest'){
      res.json(userInfo('guest'))
    }else {
      res.json(userInfo())
    }
  })

module.exports = router