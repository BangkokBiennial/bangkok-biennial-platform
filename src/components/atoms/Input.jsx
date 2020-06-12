import React from 'react';
import classNames from 'classnames';

const Input = ({
  name,
  type,
  required,
  labelName,
  className,
  reference,
  errors,
  fieldArrayTopic,
  fieldArrayName,
  fieldArrayIndex,
  onChange,
  value
}) => {
  
  if (onChange) {
    return (
      <div className={classNames('input', className)}>
        <div className="input__label__container">
          {required && <div className="input__label__asterisk">*</div>}
          <label className="input__label__text">{labelName}</label>
        </div>
        <input
          onChange={onChange}
          value={value}
          name={name}
          type={type}
          className={classNames('input__element', errorClass)}
          ref={reference}
        />
      </div>
    );
  }

  if (fieldArrayTopic && fieldArrayName && fieldArrayIndex >= 0) {
    const errorClass = errors 
      && errors[fieldArrayTopic]
      && errors[fieldArrayTopic][fieldArrayIndex]
      && errors[fieldArrayTopic][fieldArrayIndex][fieldArrayName] 
      && "input__element__error"
    return (
      <div className={classNames('input', className)}>
        <div className="input__label__container">
          {required && <div className="input__label__asterisk">*</div>}
          <label className="input__label__text">{labelName}</label>
        </div>
        <input
          name={name}
          type={type}
          className={classNames('input__element', errorClass)}
          ref={reference}
        />
        {
          errors 
            && errors[fieldArrayTopic]
            && errors[fieldArrayTopic][fieldArrayIndex]
            && errors[fieldArrayTopic][fieldArrayIndex][fieldArrayName] 
            && <p style={{ color: '#FC0000' }}>
              {errors[fieldArrayTopic][fieldArrayIndex][fieldArrayName].message}
            </p>
        }
      </div>
    );
  }

  const errorClass = errors && errors[name] && "input__element__error"
  return (
    <div className={classNames('input', className)}>
      <div className="input__label__container">
        {required && <div className="input__label__asterisk">*</div>}
        <label className="input__label__text">{labelName}</label>
      </div>
      <input
        name={name}
        type={type}
        className={classNames('input__element', errorClass)}
        ref={reference}
      />
      {errors && errors[name] && <p style={{ color: '#FC0000' }}>{errors[name].message}</p>}
    </div>
  );
};

export default Input;
