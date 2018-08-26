

import http from '../../modules/http' // 引入封装好的axios
import { CHANG_USER_STATE, CHANGE_MENU_CONFIG } from './const'

const actionCreator  = {
    get_initial_user_state (callback) { // 获取sessionStorage的方法
        let user_state = JSON.parse(sessionStorage.user_state || '{}' )

        if( !sessionStorage.user_state ) callback() // 如果sessionStorage中不存在user_state在进行登入判断

        return { type: CHANG_USER_STATE, user_state: user_state } // 这里修改的user_state是保存在sessionStorage中的user_state,
    },

     
    login ({username, password, success, fail}) {
        return dispatch => {
            http.ajax({
                url: '/api/login.json',
                params: { username, password }
            }).then(res => {
                let action =  { type: CHANG_USER_STATE, user_state: res } // 这里修改了user_state，但是没有保存到sessionStorage中

                sessionStorage.user_state = JSON.stringify(res) // 登入成功之后，将用户信息保存到sessionStorage中

                dispatch(action)
                success()
            }).catch(error => {
                fail()
            })
        }
    },

    // 注意，每次发送请求的时候，都应该把后端返回的token发送过去，后端进行判断token是否过期,这里就不写了

    get_menu_config(){ // 获取菜单
        return dispatch => {
            http.ajax({  
                url: '/api/menu.json'
            }).then(res => {
                let action = { type: CHANGE_MENU_CONFIG, menu_state: res }
                dispatch(action)
            })
        }
    }
}

export default actionCreator

