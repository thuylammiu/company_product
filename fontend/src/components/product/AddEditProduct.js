import FormRow from '../common/FormRow';
import FormRowSelect from '../common/FormRowSelect'
import {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import {addProduct} from '../../api/productApi';
import { useNavigate, useParams} from "react-router";
import{getProduct, updateProduct} from '../../api/productApi';

const AddEditProduct = () => {

    const statusOptions= ['true', 'false'];

    const initialState = {
      name: '',
      origin: '',
      price:'',
      instock: true,
      isEdit: false
    };

    const [values, setValues] = useState(initialState);
    
    const navigate = useNavigate();
    const params = useParams();

    const handleJobInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValues({ ...values, [name]: value });
      };

    const cancel = () => {      
      navigate('/home'); 
    }

    

    const onSubmit = async (e) => {
    
      e.preventDefault();
      
      const {  name, origin, price, instock } = values;
      let response;
  
      if (!name || !origin || !price || instock === null) {
          console.log(values);
          toast.error('Please fill out all fields');
          return;
      }
      
      if (values.isEdit)
      {
        response = await updateProduct({ id:params.id , name, origin, price, instock });
      }
      else
      {
        response = await addProduct({ name, origin, price, instock });
      }
  
      if (response && response.data.success ) {

            toast.success(values.isEdit ? 'Update product successfully!' : 'Add product successfully!'); 
            navigate('/home');           
        }
      else {
        
            toast.error(response.data.error);
        }
      
      };  
     
    useEffect(() => {
      if (params.id !== undefined)
      {         
        const fetch = async () => {
          try {                
              const product =  await getProduct(params.id);
              setValues({...product[0], isEdit:true});
          
          } catch (e) {}
      };

      fetch();
      
      }
    },[])    
    

    return (
        <div>
          <div className='product-page'>
                <div className='add-form'>
                <form className='form' onSubmit={onSubmit}>
        <h3>{values.isEdit ? 'Update Product' : 'Add Product'}</h3>

        <div className='form-center'>          
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleJobInput}
          />
          
          <FormRow
            type='text'
            name='origin'
            value={values.origin}
            handleChange={handleJobInput}
          />
          
          <FormRow
            type='number'
            name='price'
            labelText='price'
            value={values.price}
            handleChange={handleJobInput}
          />
          
          <FormRowSelect
            name='instock'
            value={values.instock}
            handleChange={handleJobInput}
            list={statusOptions}
          />
         
          
          <div className='btn-container'>
           
            <button
              type='submit'
              className='btn btn-block submit-btn'
            
            >
              submit
            </button>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={cancel}
            >
              cancel
            </button>
          </div>
        </div>
      </form>
        </div>
        </div>
        </div>
        
        
        
    )
}

export default AddEditProduct;