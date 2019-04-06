const initialState = {
  hightScore: 0
};

function gestionGame(state = initialState, action) {
  let nextState;

  switch (action.type) {
    case "NEW_HS":
      nextState = {
        ...state,
        hightScore: action.value
      };
      return nextState || state;

    default:
      return state;
  }
}

export default gestionGame;
