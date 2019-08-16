import React from "react";


export const FormErrors = ({formErrors}) =>
  <div>
    {Object.keys(formErrors).map((fieldName, i) => {
        return (
            formErrors[fieldName].length ? <p key={i}> {formErrors[fieldName]}</p> : ''
        )
    })}
    </div>
