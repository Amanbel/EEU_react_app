import React from "react";

export default function Est_list() {
  const [cond_var, setVar] = React.useState("serv_val");

  function handleCost(event) {
    const { value } = event.target;
    setVar(value);
  }

  return (
    <form className="est_cls">
      <select style={{ background: "#90F49B" }} onChange={handleCost}>
        <option value="serv_val">Service</option>
        <option value="mats_val">Material</option>
      </select>
      <input
        className="N_cost_input"
        type="text"
        name="cost_name"
        placeholder="Name"
      />
      <input
        className="val_cost_input"
        type="number"
        name="cost_val"
        placeholder="Cost"
      />
      {cond_var == "mats_val" && (
        <input
          className="Q_cost_input"
          type="number"
          name="quant_val"
          placeholder="Quantity"
        />
      )}
    </form>
  );
}
