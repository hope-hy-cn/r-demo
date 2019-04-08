const { Router } = require('express')
const Mock = require('mockjs')
const router = new Router()

const financeList = ({offset=0, limited=10}) => {
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
          "title": "@ctitle(5,8)",
          "createAt": "@datetime('T')",
          "type|1": [
            "收入",
            "支出"
          ],
          "price|100-1000": 1,
          "content": '@cparagraph'
        }
      ],
      totalCount,
      currentPage,
      isLastPage
    }
  )
}

const finance = (id) => {
  return Mock.mock({
    "code": 200,
    data: {
      id,
      "title": "@ctitle(5,8)",
      "type|1": [
        "收入",
        "支出"
      ],
      "price|100-1000": 1,
      "createAt": "@datetime('T')",
      content: '<p>@cparagraph </p>'
    }
  })
}

router
  .post('/api/v1/financeList',(req,res) => {
    console.log(req)
    res.json(financeList(req.body))
  })
  .post('/api/v1/finance/delete/:id',(req,res) => {
    res.json({
      "code": 200,
      "msg": "删除成功!"
    })
  })
  .post('/api/v1/finance/:id', (req, res) => {
    res.json(finance(req.params.id))
  })
  .post('/api/v1/saveFinance/save', (req,res) => {
    res.json({
      "code": 200,
      "msg": "保存成功!"
    })
  })

module.exports = router