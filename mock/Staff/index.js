const { Router } = require('express')
const Mock = require('mockjs')
const router = new Router()

const staffList = ({offset=0, limited=10}) => {
  const idStart = offset+1
  const totalCount = 48
  const currentPage = offset / limited + 1;
  const isLastPage = currentPage >= totalCount / limited;
  const dataCount = isLastPage && (totalCount%limited !== 0) ? (totalCount%limited) : limited;
  const data = `data|${dataCount}`;
  return Mock.mock(
    {
      "code": 200,
      [data]: [
        {
          "id|+1": idStart,
          "name": "@cname",
          "createAt": "@datetime('T')",
          "position|1": [
            "收银员",
            "服务员",
            "配菜员",
            "厨师",
          ],
          "age|18-45": 1,
          "address": "@county(true)",
          'phone': /^1[385][1-9]\d{8}/
        }
      ],
      totalCount,
      currentPage,
      isLastPage
    }
  )
}

const staff = (id) => {
  return Mock.mock({
    "code": 200,
    data: {
      id,
      "name": "@cname",
      "createAt": "@datetime('T')",
      "position|1": [
        "收银员",
        "服务员",
        "配菜员",
        "厨师",
      ],
      "age|18-45": 1,
      "address": "@county(true)",
      'phone': /^1[385][1-9]\d{8}/
    }
  })
}

router
  .post('/api/v1/staffList',(req,res) => {
    res.json(staffList(req.body))
  })
  .post('/api/v1/staff/delete/:id',(req,res) => {
    res.json({
      "code": 200,
      "msg": "删除成功!"
    })
  })
  .post('/api/v1/staff/:id', (req, res) => {
    res.json(staff(req.params.id))
  })
  .post('/api/v1/savestaff/save', (req,res) => {
    res.json({
      "code": 200,
      "msg": "保存成功!"
    })
  })

module.exports = router