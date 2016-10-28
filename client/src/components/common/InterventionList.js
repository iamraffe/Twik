import React, {PropTypes} from 'react'
import InterventionListItem from './InterventionListItem'

const InterventionList = ({editable, interventions, onEditIntervention, onDeleteIntervention}) => {
  console.log("INTERVENTIONS STATELESS => ", interventions)
  return(
    <div id="intervention-wrapper" className="intervention-wrapper" style={{marginTop: "50px"}}>
      <div className="row added-interventions">
        <span>Medications: </span>
        <ul className="list-unstyled" id="added-medication-interventions" data-type="medication">
          {(() => {
            if(_.filter(interventions, {type: "Medication"}).length > 0){
              return _.map(_.filter(interventions, {type: "Medication"}), (intervention, key) => {
                return <InterventionListItem
                          key={key}
                          editable={editable}
                          intervention={intervention}
                          index={key}
                          onEditIntervention={onEditIntervention}
                          onDeleteIntervention={onDeleteIntervention}
                        />
              })
            }
            else{
              return <li><i>No medications added yet...</i></li>
            }
          })()}
        </ul>
      </div>
      <div className="row added-interventions">
        <span>Events: </span>
        <ul className="list-unstyled" id="added-event-interventions" data-type="event">
          {(() => {
            // if(event.length > 0){

            // }
            // else{
            //   <li><i>No events added yet...</i></li>
            // }
            <li><i>No events added yet...</i></li>
          })()}
        </ul>
      </div>
      <div className="row added-interventions">
        <span>Lifestyle: </span>
        <ul className="list-unstyled" id="added-lifestyle-interventions" data-type="lifestyle">
          {(() => {
            // if(lifestyle.length > 0){

            // }
            // else{
            //   <li><i>No lifestyle interventions added yet...</i></li>
            // }
            <li><i>No lifestyle interventions added yet...</i></li>
          })()}
        </ul>
      </div>
    </div>
  )
}

InterventionList.propTypes = {
  interventions: PropTypes.array.isRequired,
  editable: PropTypes.bool,
  onEditIntervention: PropTypes.func,
  onDeleteIntervention: PropTypes.func
}

export default InterventionList
