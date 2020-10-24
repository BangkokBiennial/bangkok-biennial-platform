import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Button = ({
  text = 'Submit',
  disabled = false,
  type,
  onClick,
  className,
  children,
  style,
}) => {
  return (
    <button
      style={style}
      type={type}
      className={classNames('btn', className, {
        'btn--disabled': disabled,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {children ? <span>{children}</span> : <span>{text}</span>}
    </button>
  )
}

Button.propTypes = {
  style: PropTypes.object,
}

Button.defaultProps = {
  style: {},
}

export default Button
