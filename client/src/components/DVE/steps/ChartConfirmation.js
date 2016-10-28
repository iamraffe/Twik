import React, {PropTypes} from 'react'

class ChartConfirmation extends React.Component{
  constructor(props,context){
    super(props, context)

    this.onChartCompleted = props.onChartCompleted
    this.onSetStep = props.onSetStep
  }

  render(){
    const { chart } = this.props

    return(
      <section className="chart-current-step">
        <button
          type="button"
          className="previous-step-toolbox close"
          onClick={() => this.onSetStep('interventions')}
          >
          <span className="fa fa-long-arrow-left"></span>
        </button>
        <div className="confirmation-step">
          <header className="row">
            <h1>You're all set!</h1>
            <h2>A <i><em>{chart.type}</em> Data Chart</i> for the patient <strong className="patient-name">{`${chart.user.first_name} ${chart.user.last_name}`}</strong> has been created.</h2>
          </header>
          <button className="btn btn-slim btn-light btn-block" onClick={this.onChartCompleted}>Save</button>
        </div>
      </section>
    )
  }
}

export default ChartConfirmation