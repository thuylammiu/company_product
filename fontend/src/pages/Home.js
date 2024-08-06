import useGlobalContext from "../hooks/useGlobalContext";
import ProductList from '../components/product/ProductList';
import '../assets/css/ProductMainPage.css';
import ProductSearch from "../components/product/ProductSearch";


const Home = () => {
    const [globalContext] = useGlobalContext();
    return <div>
        {(globalContext.token && globalContext.token !== "") && 
        <div>
            <ProductSearch/>
        <ProductList/>
        </div>
        }
        
    </div>;
}

export default Home;