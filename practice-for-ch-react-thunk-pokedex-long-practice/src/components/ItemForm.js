import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createItem, editItem } from '../store/items';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const ItemForm = ({ itemId, hideForm }) => {
  let item = useSelector(state => state.items[itemId]);
  const { pokemonId } = useParams();
  var creatingItem = false;
  var text = "Update Item";
  if (!item) {
    item = { pokemonId };
    creatingItem = true;
    text = "Add Item";
  }
  const [happiness, setHappiness] = useState(item.happiness);
  const [price, setPrice] = useState(item.price);
  const [name, setName] = useState(item.name);

  const updateName = (e) => setName(e.target.value);
  const updateHappiness = (e) => setHappiness(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...item,
      name,
      happiness,
      price
    };
    let returnedItem = undefined;
    if (creatingItem) {
      returnedItem = dispatch(createItem(payload));
    } else {
      returnedItem = dispatch(editItem(payload));
    }
    
    if (returnedItem) {
      hideForm();
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <section className="edit-form-holder centered middled">
      <form className="item-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={updateName}
        />
        <input
          type="number"
          placeholder="Happiness"
          min="0"
          max="100"
          required
          value={happiness}
          onChange={updateHappiness}
        />
        <input
          type="number"
          placeholder="Price"
          required
          value={price}
          onChange={updatePrice}
        />
        <button type="submit">{text}</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default ItemForm;