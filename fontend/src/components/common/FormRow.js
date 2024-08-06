const FormRow = ({ type, name, value, handleChange, labelText, handleBlur, errorMsg }) => {
    return (
      <div className='form-row'>
        <label htmlFor={name} className='form-label'>
          {labelText || name}
        </label>
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className='form-input'
        />
        {
          errorMsg && 
          <i style={{ fontSize:"14px", listStyleType:"none", color: 'red' }}>{errorMsg}</i>
        }
      </div>
    );
  };
  export default FormRow;
  