export const initialState=null;

export const userReducer=(state,action)=>{
    if(action.type="USER"){
        return action.payload;
    }
    else if(action.type="CLEAR"){
        return null;
    }
    return state;
}