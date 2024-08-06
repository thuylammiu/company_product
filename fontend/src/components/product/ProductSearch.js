import React from "react";
import FormRow from "../common/FormRow";
import FormRowSelect from "../common/FormRowSelect";
import { useState } from "react";
import { searchProducts } from "../../api/productApi";
import { ProductContext } from "../../context/productContext";

const ProductSearch = () => {
  const { setProducts, originalProducts } = React.useContext(ProductContext);

  const statusOptions = ["", "true", "false"];

  const initialState = {
    name: "",
    origin: "",
    instock: "",
  };

  const [values, setValues] = useState(initialState);

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSearch = (e) => {
    e.preventDefault();

    const { name, origin, instock } = values;
    var result = searchProducts(originalProducts, name, origin, instock);
    setProducts(result);
  };

  return (
    <div>
      <div className="product-page">
        <div className="add-form search-form">
          <h5>Search Product</h5>

          <div className="form-center">
            <FormRow
              type="text"
              name="name"
              value={values.name}
              handleChange={handleJobInput}
            />

            <FormRow
              type="text"
              name="origin"
              value={values.origin}
              handleChange={handleJobInput}
            />

            <FormRowSelect
              name="instock"
              value={values.instock}
              handleChange={handleJobInput}
              list={statusOptions}
            />
          </div>

          <div className="btn-search-container">
            <button type="submit" className="btn clear-btn" onClick={onSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
