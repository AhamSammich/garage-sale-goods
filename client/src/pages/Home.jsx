import { useEffect } from "react";
import ItemDetails from "../components/ItemDetails";
import ItemForm from "../components/ItemForm";
import useItemsContext from "../hooks/useItemsContext";
import useAuthContext from "../hooks/useAuthContext";

const Home = () => {
  const { items, dispatch } = useItemsContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/api/items/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({
          type: "SET_ITEMS",
          payload: json,
        });
      }
    };

    if (user) fetchItems();
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="items">
        {items &&
          items.map((item) => <ItemDetails key={item._id} item={item} />)}
      </div>
      <ItemForm />
    </div>
  );
};

export default Home;
