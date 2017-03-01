import React from 'react'

const Card = ({ selected, model, onClick }) => {
  const imageStyle = {
    backgroundImage: 'url(' + model.thumbnail_uri + ')'
  }
  let className = 'card'
  if (selected)
    className += ' selected'
  return (
    <li onClick={onClick} className={className}>
      <div className='card-image' style={imageStyle} />
      <p className='card-title'>{model.title}</p>
      <p className='card-synopsis'>{model.synopsis}</p>
    </li>
  )
}

Card.propTypes = {
  selected: React.PropTypes.bool,
  model: React.PropTypes.object,
  onClick: React.PropTypes.func,
}

export default Card
