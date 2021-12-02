export const reducer = (state = { count: 0 }, action) => {
    switch (action.type) {
      case "increment":
        return {
          ...state,
          count: state.count + 1,
        };
      case "decrement":
        return {
          ...state,
          count: state.count - 1,
        };
      default:
        return state;
    }
  };
  
  export const createStore = (initialState, reducer) => {
    let currentState = initialState;
    const listeners = [];
  
    const getState = () => currentState;
  
    const subscribe = (listener) => listeners.push(listener);
  
    const dispatch = (action) => {
      currentState = reducer(currentState, action);
  
      listeners.forEach((listener) => listener());
  
      return action;
    };
  
    return { getState, subscribe, dispatch };
  };
  
  export const store = createStore({ count: 0 }, reducer);