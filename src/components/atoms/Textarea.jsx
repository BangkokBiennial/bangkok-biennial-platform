import React from 'react';
import classNames from 'classnames';

const Textarea = ({
  name,
  type,
  required,
  labelName,
  className,
  rows,
  cols,
  errors,
  reference,
  fieldArrayTopic,
  fieldArrayName,
  fieldArrayIndex
}) => {
  if (fieldArrayTopic && fieldArrayName && fieldArrayIndex >= 0) {
    const errorClass = errors 
      && errors[fieldArrayTopic]
      && errors[fieldArrayTopic][fieldArrayIndex]
      && errors[fieldArrayTopic][fieldArrayIndex][fieldArrayName] 
      && "textarea__element__error"
      return (
        <div className={classNames('textarea', className)}>
          <div className="textarea__label__container">
            {required && <div className="textarea__label__asterisk">*</div>}
            <label className="textarea__label__text">{labelName}</label>
          </div>
          <textarea
            rows={rows}
            cols={cols}
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
              && (<p style={{ color: '#FC0000' }}>
                    {errors[fieldArrayTopic][fieldArrayIndex][fieldArrayName].message}
                  </p>)
          }
        </div>
      );
  }

  const errorClass = errors && errors[name] && "textarea__element__error"
  return (
    <div className={classNames('textarea', className)}>
      <div className="textarea__label__container">
        {required && <div className="textarea__label__asterisk">*</div>}
        <label className="textarea__label__text">{labelName}</label>
      </div>
      <textarea
        rows={rows}
        cols={cols}
        name={name}
        type={type}
        className={classNames('input__element', errorClass)}
        ref={reference}
      />
      {errors && errors[name] && <p style={{ color: '#FC0000' }}>{errors[name].message}</p>}
    </div>
  );
};

export default Textarea;
