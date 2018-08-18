

import http from '../../modules/http' // 引入封装好的axios
import { CHANG_USER_STATE } from './const'

const actionCreator  = {
    login ({username, password, success, fail}) {
        return dispatch => {
            http.ajax({
                url: '/api/login.json',
                params: { username, password }
            }).then(res => {
                let action =  { type: CHANG_USER_STATE, user_state: res }
                dispatch(action)
                success()
            }).catch(error => {
                fail()
            })
        }
    }
}

export default actionCreator

