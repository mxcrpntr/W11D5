export const LOAD_ITEMS = "items/LOAD_ITEMS";
export const UPDATE_ITEM = "items/UPDATE_ITEM";
export const REMOVE_ITEM = "items/REMOVE_ITEM";
export const ADD_ITEM = "items/ADD_ITEM";

const load = (items, pokemonId) => ({
  type: LOAD_ITEMS,
  items,
  pokemonId
});

const update = (item) => ({
  type: UPDATE_ITEM,
  item
});

const add = (item) => ({
  type: ADD_ITEM,
  item
});

const remove = (itemId, pokemonId) => ({
  type: REMOVE_ITEM,
  itemId,
  pokemonId
});

export const getItems = (pokemon) => async dispatch => {
  const response = await fetch(`/api/pokemon/${pokemon.id}/items`);
  if (response.ok) {
    const list = await response.json();
    console.log(pokemon)
    dispatch(load(list,pokemon.id));
  }
};

export const createItem = (payload) => async (dispatch,getState) => {
  const res = await fetch(`/api/pokemon/${payload.pokemonId}/items`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  if (res.ok) {
    const data = await res.json();
    dispatch(add(data))
    return data;
  }
}

export const editItem = (item) => async (dispatch,getState) => {
  const res = await fetch(`/api/items/${item.id}`, {
    method: 'PATCH',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  if (res.ok) {
    const data = await res.json();
    dispatch(update(data))
    return data;
  }
}

export const deleteItem = (item) => async (dispatch,getState) => {
  const res = await fetch(`/api/items/${item.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (res.ok) {
    dispatch(remove(item.id,item.pokemonId));
  }
}

const initialState = {};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS: 
      const newItems = {};
      action.items.forEach(item => {
        newItems[item.id] = item;
      })
      return {
        ...state,
        ...newItems
      }
    case REMOVE_ITEM: 
      const newState = { ...state };
      delete newState[action.itemId];
      return newState;
    case ADD_ITEM:
    case UPDATE_ITEM: 
      return {
        ...state,
        [action.item.id]: action.item
      };
    default:
      return state;
  }
};

export default itemsReducer;