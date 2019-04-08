import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'
const ajax = axios.create({
  baseURL: isDev ? "http://127.0.0.1:4444" : '/'

})

// Finance
export const fetchFinanceList = (params) => {
  return ajax.post('/api/v1/financeList', params)
}

export const deleteFinanceById = (id) => {
  return ajax.post(`/api/v1/finance/delete/${id}`)
}

export const fetchFinance = (id) => {
  return ajax.post(`/api/v1/finance/${id}`)
}

export const saveFinance = (data) => {
  return ajax.post(`/api/v1/saveFinance/save`, data)
}

// Staff
export const fetchStaffList = (params) => {
  return ajax.post('/api/v1/staffList', params)
}

export const deleteStaffById = (id) => {
  return ajax.post(`/api/v1/staff/delete/${id}`)
}

export const fetchStaff = (id) => {
  return ajax.post(`/api/v1/staff/${id}`)
}

export const saveStaff = (data) => {
  return ajax.post(`/api/v1/saveStaff/save`, data)
}

// Department
export const fetchDepartmentList = (params) => {
  return ajax.post('/api/v1/departmentList', params)
}

export const deleteDepartmentById = (id) => {
  return ajax.post(`/api/v1/department/delete/${id}`)
}

export const fetchDepartment = (id) => {
  return ajax.post(`/api/v1/department/${id}`)
}

export const saveDepartment = (data) => {
  return ajax.post(`/api/v1/saveDepartment/save`, data)
}

// workMail
export const fetchWorkMailList = (params) => {
  return ajax.post('/api/v1/workMailList', params)
}

export const deleteWorkMailById = (id) => {
  return ajax.post(`/api/v1/workMail/delete/${id}`)
}

export const fetchWorkMail = (id) => {
  return ajax.post(`/api/v1/workMail/${id}`)
}

export const saveWorkMail = (data) => {
  return ajax.post(`/api/v1/saveWorkMail/save`, data)
}

// JobDiary
export const fetchJobDiaryList = (params) => {
  return ajax.post('/api/v1/jobDiaryList', params)
}

export const deleteJobDiaryById = (id) => {
  return ajax.post(`/api/v1/jobDiary/delete/${id}`)
}

export const fetchJobDiary = (id) => {
  return ajax.post(`/api/v1/jobDiary/${id}`)
}

export const saveJobDiary = (data) => {
  return ajax.post(`/api/v1/saveJobDiary/save`, data)
}

// login
export const userLogin = (e) => {
  return ajax.post("/api/v1/user/login",e)
}