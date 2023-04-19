import { createStore, applyMiddleware, compose } from 'redux';
import { createSelector } from 'reselect';

export const id = (num => () => num++)(1);
const initialState = {
  comments: []
};

//action types
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';
//action creators
export const addComment = comment => ({
  type: ADD_COMMENT,
  payload: comment
});
export const deleteComment = comment =>({
  type: DELETE_COMMENT,
  payload: comment
})
const reducer = (state, { type, payload }) => {
  if (type === ADD_COMMENT) {
    return {
      ...state,
      comments: [payload, ...state.comments]
    };
  }
  if(type ===DELETE_COMMENT){
    console.log("delete")
    return {
      ...state,
      comments: [...state.comments]
    };
  }
  return state;
};

//selectors
export const selectComments = state => state.comments;
export const selectCommentsMap = createSelector(
  [selectComments],
  comments =>
    comments.reduce(
      (comments, comment) => comments.set(comment.id, comment),
      new Map()
    )
);

export const recursiveUpdate = (updated, nestedMap) => {
  const recur = updated => {
    nestedMap.set(updated.id, updated);
    if (updated.id === 'root') {
      return;
    }
    const parent = nestedMap.get(updated.pid);
    const newParent = {
      ...parent,
      children: parent.children.map(child =>
        child.id === updated.id ? updated : child
      )
    };
    return recur(newParent);
  };
  return recur(updated);
};

export const addNewComment = (comment, nestedMap) => {
  comment = { ...comment, children: [] };
  nestedMap.set(comment.id, comment);
  const parent = nestedMap.get(comment.pid);
  const updatedParent = {
    ...parent,
    children: [comment, ...parent.children]
  };
  recursiveUpdate(updatedParent, nestedMap);
};

export const selectGroupedComments = (() => {
  const nestedMap = new Map([['root', { id: 'root', children: [] }]]);
  return createSelector(
    [selectCommentsMap],
    currentMap => {
      [...currentMap.entries()].forEach(([id, comment]) => {
        if (!nestedMap.get(id)) {
          addNewComment(comment, nestedMap);
        }
      });
      return nestedMap.get('root').children;
    }
  );
})(); 

//creating store with redux dev tools
export const composeEnhancers = compose;

export const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(() => next => action => next(action)))
);
