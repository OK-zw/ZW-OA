import state from './state'
import { CHANG_USER_STATE, CHANGE_MENU_CONFIG } from './const'


const reducer = (previousState = state, action) => {
        let new_state = { ...previousState }

        switch ( action.type ) {
            case CHANG_USER_STATE:
            new_state.user_state = action.user_state  
            break;

            case CHANGE_MENU_CONFIG:
            new_state.menu_state = action.menu_state
            break;

            default: break;
        }

        return new_state

}

export default reducer


