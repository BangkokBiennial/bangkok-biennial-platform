import React from 'react';
import classNames from 'classnames';

const Input = ({
  name,
  value,
  onChange,
  type,
  required,
  labelName,
  className,
  maxlength
}) => {
  return (
    <div className={classNames('input', className)}>
      <div className="input__label__container">
        {required && <div className="input__label__asterisk">*</div>}
        <label className="input__label__text">{labelName}</label>
      </div>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        className="input__element"
        maxlength={maxlength}
      />
    </div>
  );
};

Input.defaultProps = {
  maxlength: 1000
}

export default Input;
