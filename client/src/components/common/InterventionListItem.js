import React, {PropTypes} from 'react'

const InterventionListItem = ({index, editable, intervention, onEditIntervention, onDeleteIntervention}) => {
  if(editable){
    return(
      <li>
        {`${intervention.title} => ${intervention.description}`}
        <span className="fa fa-pencil" onClick={() => { onEditIntervention(intervention.type, index) }}></span>
        <span className="fa fa-times text-danger" onClick={() => { onDeleteIntervention(intervention.type, index) }}></span>
      </li>
    )
  }
  else{
    return(
      <li>{`${intervention.title} => ${intervention.description}`}</li>
    )
  }
}

InterventionListItem.propTypes = {
  intervention: PropTypes.object.isRequired,
  editable: PropTypes.bool,
  onEditIntervention: PropTypes.func,
  onDeleteIntervention: PropTypes.func,
  index: PropTypes.number.isRequired
}

export default InterventionListItem
