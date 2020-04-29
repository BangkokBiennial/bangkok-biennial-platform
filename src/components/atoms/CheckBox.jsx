import React from 'react';
import classNames from 'classnames';
import { FiCheck } from 'react-icons/fi'

const CheckBox = ({
  value,
  onClick,
  labelName,
  className,
  required
}) => {
  return (
    <div className={classNames('checkbox', className)}>
      <div className="checkbox__label__container">
        {required && <div className="checkbox__label__asterisk">*</div>}
        <label className="checkbox__label__text">{labelName}</label>
      </div>
      <div className="checkbox__element__container">
        <div
          onClick={onClick}
          className={value ? "checkbox__element__checked" : "checkbox__element__unchecked"}
        >
          {value ? <FiCheck className="checkbox__element__check-icon"/> : null}
        </div>
        <p className="checkbox__label__value">
          { value ? 'yes' : 'no' }
        </p>
      </div>
    </div>
  );
};

export default CheckBox;
