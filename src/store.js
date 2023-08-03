import { createStore } from 'redux'

const initialState = {
  dataList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA_LIST':
      return { ...state, dataList: [...action.payload] }
    default:
      return state
  }
}

const store = createStore(reducer)

export default store
