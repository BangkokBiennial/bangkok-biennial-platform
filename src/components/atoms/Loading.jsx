import React from 'react'
import PropTypes from 'prop-types'
import ClipLoader from 'react-spinners/ClipLoader'

const Loading = ({ size, color, containerStyle }) => (
  <div className="loading__container" style={containerStyle}>
    <ClipLoader size={size} color={color} loading={true} />
  </div>
)

Loading.defaultProps = {
  size: 100,
  color: '#2F2E2E',
  style: {},
}

Loading.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.object,
}

export default Loading
