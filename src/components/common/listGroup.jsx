import React from 'react'
const ListGruop = (props) => {
  const {
    genres,
    valueProperty,
    textProperty,
    selectedItem,
    onItemSelect,
  } = props
  return (
    <ul className="list-gruop">
      {genres.map((genre) => (
        <li
          key={genre[valueProperty]}
          onClick={() => onItemSelect(genre)}
          className={
            selectedItem == genre ? 'list-group-item active' : 'list-group-item'
          }
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  )
}
ListGruop.defaultProps = {
  valueProperty: '_id',
  textProperty: 'name',
}

export default ListGruop
