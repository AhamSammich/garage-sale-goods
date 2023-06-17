import { useState, useRef } from "react";
import useItemsContext from "../hooks/useItemsContext";
import useAuthContext from "../hooks/useAuthContext";

export default function ItemForm() {
  const formRef = useRef(null);
  const [brandName, setBrandName] = useState("");
  const [modelNo, setModelNo] = useState("");
  const [yearManufactured, setYearManufactured] = useState("");
  const [condition, setCondition] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useItemsContext();
  const { user } = useAuthContext();

  const resetForm = () => {
    setBrandName("");
    setModelNo("");
    setYearManufactured("");
    setCondition("");
    setNotes("");
  };

  function formIsValidated() {
    let isValid = true;
    const requiredFields = formRef.current?.querySelectorAll("[data-required]");
    for (let input of requiredFields) {
      if (input.value === "") {
        input.classList.add("error");
        isValid = false;
      } else {
        input.classList.remove("error");
      }
    }
    return isValid;
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!user) {
      setError("Authentication required.");
      return;
    }

    if (!formIsValidated()) {
      setError("Please fill in required (*) fields.");
      return;
    }

    const item = {
      brandName,
      modelNo,
      yearManufactured: yearManufactured || "unknown",
      condition,
      notes,
    };

    const response = await fetch("/api/items", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      resetForm();
      setError(null);
      console.log("New item added.", json);
      dispatch({
        type: "CREATE_ITEM",
        payload: json,
      });
    }
  };

  return (
    <form ref={formRef} className="create" onSubmit={handleSubmit}>
      <h3>Add a New Item</h3>

      <div className="input-container">
        <label htmlFor="item-brand">Brand Name</label>
        <input
          id="item-brand"
          type="text"
          value={brandName}
          onChange={(ev) => setBrandName(ev.target.value)}
          data-required
        />
      </div>

      <div className="input-container">
        <label htmlFor="item-model">Model No.</label>
        <input
          id="item-model"
          type="text"
          value={modelNo}
          onChange={(ev) => setModelNo(ev.target.value)}
          data-required
        />
      </div>

      <div className="input-container">
        <label htmlFor="item-year">Year Manufactured</label>
        <input
          id="item-year"
          type="text"
          value={yearManufactured}
          onChange={(ev) => setYearManufactured(ev.target.value)}
        />
      </div>

      <div className="input-container">
        <label htmlFor="item-condition">Condition</label>
        <select
          id="item-condition"
          value={condition}
          onChange={(ev) => setCondition(ev.target.value)}
          data-required
        >
          <option value="" disabled>
            Please select one...
          </option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
          <option value="poor">Poor</option>
        </select>
      </div>

      <div className="input-container">
        <label htmlFor="item-notes">Notes</label>
        <textarea
          id="item-notes"
          rows="5"
          value={notes}
          onChange={(ev) => setNotes(ev.target.value)}
        />
      </div>

      <button type="submit">Add Item</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
