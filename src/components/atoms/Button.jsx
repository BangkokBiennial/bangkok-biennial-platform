import React from 'react';
import classNames from 'classnames';

const Button = ({
  text = 'Submit',
  disabled = false,
  type,
  onClick,
  className,
  component
}) => {
  return (
    <button
      type={type}
      className={classNames('btn', className, {
        'btn--disabled': disabled,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {
        component
          ? component
          : <span>{text}</span>
      }
    </button>
  );
};

export default Button;
