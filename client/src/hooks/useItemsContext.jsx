import { ItemsContext } from "../context/ItemContext";
import { useContext } from "react";

export default function useItemsContext() {
  const context = useContext(ItemsContext); // {state, dispatch}

  if (!context) {
    throw Error("useItemsContext must be used inside ItemsContextProvider");
  }

  return context;
}
