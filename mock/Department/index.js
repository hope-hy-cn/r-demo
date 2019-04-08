const { Router } = require('express')
const Mock = require('mockjs')
const router = new Router()

const departmentList = ({offset=0, limited=10}) => {
  const idStart = offset+1
  const totalCount = 13
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
          "department": "@ctitle(3,4)",
          "administration": "@ctitle(3,4)",
          "function": "@ctitle(7,15)",
          "createAt": "@datetime('T')"
        }
      ],
      totalCount,
      currentPage,
      isLastPage
    }
  )
}

const department = (id) => {
  return Mock.mock({
    "code": 200,
    data: {
      id,
      "department": "@ctitle(3,4)",
      "administration": "@ctitle(3,4)",
      "function": "@ctitle(5,10)",
      "createAt": "@datetime('T')"
    }
  })
}

router
  .post('/api/v1/departmentList',(req,res) => {
    res.json(departmentList(req.body))
  })
  .post('/api/v1/department/delete/:id',(req,res) => {
    res.json({
      "code": 200,
      "msg": "删除成功!"
    })
  })
  .post('/api/v1/department/:id', (req, res) => {
    res.json(department(req.params.id))
  })
  .post('/api/v1/saveDepartment/save', (req,res) => {
    res.json({
      "code": 200,
      "msg": "保存成功!"
    })
  })

module.exports = router