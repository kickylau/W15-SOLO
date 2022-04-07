import { csrfFetch } from "./csrf";

const ADD_COMMENTS = 'comments/addComments';
const ADD_ONE_COMMENT = 'comments/addOneComment';
const REMOVE_ONE_COMMENT = 'comments/removeOneComment';
//const cafeId = cafe.id


const addComments = (payload) => {
    return {
        type: ADD_COMMENTS,
        payload
    };
};

const addOneComment = (payload) => {
    return {
        type: ADD_ONE_COMMENT,
        payload
    };
};

const removeOneComment = (id) => {
    return {
        type: REMOVE_ONE_COMMENT,
        payload: id };
};

export const getAllComments = () => async (dispatch) => {
    const response = await csrfFetch(`/api/comments`);
    if (response.ok) {
        const data = await response.json();
        dispatch(addComments(data));
    }
};

export const addComment = (answer) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/new`, {
        method: 'POST',
        //headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answer)
    });

    if (response.ok) {
        const data = await response.json();
        //console.log('add', data);
        dispatch(addOneComment(data));
        return response;
    }
};





export const deleteComment = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/cafes/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        //const data = await response.json()
        //console.log(data)
        dispatch(removeOneComment(id));
    }
};



// export const deleteSpot = (id) => async (dispatch) => {
//   await csrfFetch(`/api/spots/${id}`, { method: 'DELETE' })
//   dispatch(updateSpotExistence());
// }

const commentReducer = (state = {}, action) => {
    let newState = {};
    switch (action.type) {
        case ADD_COMMENTS:
            action.payload.forEach((answer) => (newState[answer.id] = answer));
            return newState;
        case ADD_ONE_COMMENT:
            newState = { ...state, [action.payload.id]: action.payload };
            return newState;

        case REMOVE_ONE_COMMENT:
            newState = { ...state };
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
};

export default commentReducer;
