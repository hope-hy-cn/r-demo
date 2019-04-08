const { Router } = require('express')
const Mock = require('mockjs')
const router = new Router()

// WorkMail
const workMailList = ({offset=0, limited=10}) => {
  const idStart = offset+1
  const totalCount = 9
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
          "sender": "@cname",
          "title": "@ctitle(7,13)",
          "createAt": "@datetime('T')",
          "content": '@cparagraph'
        }
      ],
      totalCount,
      currentPage,
      isLastPage
    }
  )
}

const workMail = (id) => {
  return Mock.mock({
    "code": 200,
    data: {
      id,
      "title": "@ctitle(7,13)",
      "createAt": "@datetime('T')",
      "content": '@cparagraph'
    }
  })
}

// JobDiary
const jobDiaryList = ({offset=0, limited=10}) => {
  const idStart = offset+1
  const totalCount = 14
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
          "title": "@ctitle(7,13)",
          "createAt": "@datetime('T')",
          "content": '@cparagraph'
        }
      ],
      totalCount,
      currentPage,
      isLastPage
    }
  )
}

const jobDiary = (id) => {
  return Mock.mock({
    "code": 200,
    data: {
      id,
      "title": "@ctitle(7,13)",
      "createAt": "@datetime('T')",
      "content": '@cparagraph'
    }
  })
}

router
  // WorkMail
  .post('/api/v1/workMailList',(req,res) => {
    res.json(workMailList(req.body))
  })
  .post('/api/v1/workMail/delete/:id',(req,res) => {
    res.json({
      "code": 200,
      "msg": "删除成功!"
    })
  })
  .post('/api/v1/workMail/:id', (req, res) => {
    res.json(workMail(req.params.id))
  })
  .post('/api/v1/saveWorkMail/save', (req,res) => {
    res.json({
      "code": 200,
      "msg": "保存成功!"
    })
  })
  // JobDiary
  .post('/api/v1/jobDiaryList',(req,res) => {
    res.json(jobDiaryList(req.body))
  })
  .post('/api/v1/jobDiary/delete/:id',(req,res) => {
    res.json({
      "code": 200,
      "msg": "删除成功!"
    })
  })
  .post('/api/v1/jobDiary/:id', (req, res) => {
    res.json(jobDiary(req.params.id))
  })
  .post('/api/v1/saveJobDiary/save', (req,res) => {
    res.json({
      "code": 200,
      "msg": "保存成功!"
    })
  })

module.exports = router