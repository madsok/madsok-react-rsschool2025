import type I_PokemonItem from '../../interfaces/I_PokemonItem';
import './ItemDetails.css';

interface ItemDetailsProps {
  onItemDetailsClose: (state: boolean) => void;
  data: I_PokemonItem;
}

function ItemDetails({ data, onItemDetailsClose }: ItemDetailsProps) {
  function closeButtonHandler() {
    onItemDetailsClose(false);
  }
  return (
    <>
      <div className="details-item">
        <button onClick={closeButtonHandler}>Close</button>
        <div>
          <h3>Item name</h3>
          <p>{data.name}</p>
        </div>
        <div>
          <h3>Item Sprite</h3>
          <img src={data.sprites.back_default} alt="" />
        </div>
      </div>
    </>
  );
}

export default ItemDetails;
