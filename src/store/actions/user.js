import actionsType from './actionType'
import { userLogin } from '../../requests'

const loginSuccess = (data) => {
  console.log("actions:  " + data)
  return {
    type: actionsType.LOGIN_SUCCESS,
    payload: data
  }
}

export const doLogin = (data) => {
  return dispath => {
    userLogin(data)
      .then(resp => {
        if(resp.data.data.status === 1){
          // console.log(resp.data.data)
          dispath(loginSuccess(resp.data.data))
        }else{
          console.log(resp)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export const logout = () => {
  return {
    type: actionsType.LOGOUT
  }
}