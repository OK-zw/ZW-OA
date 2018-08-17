import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actionCreators from './actionCreators'
// connect(TodoContent, 'todolist', { reducer: 'abc', state: ['a', 'b'] })


const _connect = ( UIComponent, ...reducerOptions ) => {
    //判断不同的情况来设置这个mapStateToProps
    let mapStateToProps = (state) => {
        //如果我们使用的时候什么都没传  connect(TodoContent），把所有reducer的数据都给他
        if ( !reducerOptions.length ) return state;

        let _state = {}//准备返回的真正的state
        
        reducerOptions.forEach(reducer => {
            if ( (typeof reducer)  === 'string') {//如果这个元素是一个字符串，那就是对于的reducer的名字
                if (state[reducer]) { //如果这个reducer对于的状态存在的话
                    _state[reducer] = state[reducer]
                }
            }else { //如果传入的是对象的话
                if ( state[reducer.reducer] ) {
                    //如果没有传state
                    if ( !reducer.state || !reducer.state.length) {
                        _state[reducer.reducer] = state[reducer.reducer]
                    }else {
                        _state[reducer.reducer] = {}
                        reducer.state.forEach(s => {
                            _state[reducer.reducer][s] = state[reducer.reducer][s]
                        })
                    }
                }
            }
        });

        return _state;

    }

    let mapDispatchToProps = (dispatch) => {
        //如果我们没有指定reducer的话
        if ( !reducerOptions.length ) return {};
        let actions = {}
        reducerOptions.forEach(reducer => {
            if ( (typeof reducer)  === 'string') {//如果这个元素是一个字符串，那就是对于的reducer的名字
                if (actionCreators[reducer]) { //如果这个reducer对于的状态存在的话
                    actions[reducer+'_actions'] = bindActionCreators(actionCreators[reducer], dispatch)
                }
            }else { //如果传入的是对象的话
                if ( actionCreators[reducer.reducer] ) {
                    actions[reducer.reducer+'_actions'] = bindActionCreators(actionCreators[reducer.reducer], dispatch)
                }
            }
        });


        return actions

    }

    return connect(mapStateToProps, mapDispatchToProps)(UIComponent)
}

export default _connect