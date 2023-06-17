import useItemsContext from "../hooks/useItemsContext";
import useAuthContext from "../hooks/useAuthContext";

import { formatDistanceToNow } from "date-fns";

export default function ItemDetails({ item }) {
  const { dispatch } = useItemsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) return;
    const response = await fetch(`/api/items/${item._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({
        type: "DELETE_ITEM",
        payload: json,
      });
    }
  };
  return (
    <div className="item-details">
      <h4>{item.brandName}</h4>
      <p>
        <strong>Model: </strong>
        {item.modelNo} {item.yearManufactured && ` (${item.yearManufactured})`}
      </p>
      <p>
        <strong>Condition: </strong>
        {item.condition}
      </p>
      <div>
        {item.notes && (
          <p>
            <strong>Notes: </strong>
            {item.notes}
          </p>
        )}
      </div>
      <p className="item-timestamp">
        Updated{" "}
        {formatDistanceToNow(new Date(item.updatedAt), {
          addSuffix: true,
        })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
}
