import React from 'react';
import classNames from 'classnames';
import { FiCheck } from 'react-icons/fi'

const CheckBox = ({
  value,
  onClick,
  labelName,
  className,
  required,
  staticLabel,
  disabled
}) => {
  return (
    <div className={classNames('checkbox', className)}>
      <div className="checkbox__label__container">
        {required && <div className="checkbox__label__asterisk">*</div>}
        <label className="checkbox__label__text">{labelName}</label>
      </div>
      <div className={classNames("checkbox__element__container", disabled && "disabled")}>
        <div
          onClick={disabled ? () => {} : onClick}
          className={value ? "checkbox__element__checked" : "checkbox__element__unchecked"}
        >
          {value ? <FiCheck className="checkbox__element__check-icon"/> : null}
        </div>
        <p className="checkbox__label__value">
          { 
            staticLabel
              ? staticLabel
              : value ? 'yes' : 'no' 
          }
        </p>
      </div>
    </div>
  );
};

export default CheckBox;
