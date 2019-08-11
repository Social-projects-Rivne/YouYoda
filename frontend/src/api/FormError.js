import React from "react";


const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
        return (
            formErrors[fieldName].length ? <p key={i}> {formErrors[fieldName]}</p> : ''
        )
    })}
    </div>

export { FormErrors };
