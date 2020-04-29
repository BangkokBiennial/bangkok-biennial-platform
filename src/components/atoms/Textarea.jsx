import React from 'react';
import classNames from 'classnames';

const Textarea = ({
  name,
  value,
  onChange,
  type,
  required,
  labelName,
  className,
  row,
  column
}) => {
  return (
    <div className={classNames('textarea', className)}>
      <div className="textarea__label__container">
        {required && <div className="textarea__label__asterisk">*</div>}
        <label className="textarea__label__text">{labelName}</label>
      </div>
      <textarea
        rows={row}
        cols={column}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        className="textarea__element"
      />
    </div>
  );
};

export default Textarea;
