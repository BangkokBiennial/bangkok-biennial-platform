import React from 'react';
import classNames from 'classnames';

const Button = ({
  text = 'Submit',
  disabled = false,
  type,
  onClick,
  className,
  children,
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
        children
          ? <span>{children}</span>
          : <span>{text}</span>
      }
    </button>
  );
};

export default Button;
