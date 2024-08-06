import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "../../assets/css/ProductMainPage.css";
import { useNavigate } from "react-router";
import { deleteProduct } from "../../api/productApi";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  console.log(product);
  const navigate = useNavigate();

  const editProduct = () => {
    navigate("/edit/" + product.id);
  };

  const deleteItem = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            debugger;
            var response = await deleteProduct(product.id);
            if (response.data.success) {
              window.location.reload(true);
            } else {
              toast.error("Error when delete product!");
              return;
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <article className="product-item">
      <header>
        <i class="fa-solid fa-plus"></i>
        <div className="info">
          <h5>{product.name}</h5>
          <p>{product.origin}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <span> $ {product.price}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ fontSize: "1rem" }}>
            <input
              type="checkbox"
              checked={product.instock === true || product.instock === "true"}
            ></input>{" "}
            In stock{" "}
          </span>
        </div>
        <footer>
          <div className="actions">
            <button
              type="button"
              className="btn edit-btn"
              onClick={editProduct}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn delete-btn"
              onClick={deleteItem}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
};
export default Product;
