import React, { PropTypes } from 'react'
import moment from 'moment'

import EnginePanel from '../DVE/EnginePanel'
import Panels from './Panels'

class BuilderPanel extends React.Component{
  constructor(props, context){
    super(props, context)

    this.state = {
      step: props.step,
      chart: props.chart,
      entries: props.entries,
      interventions: props.interventions,
      inputRowLength: props.entries.length === 0 ? 5 : props.entries.length,
      randomEntries: [],
      report: props.report
    }

    this.onDataSelected = props.onDataSelected
    this.onInterventionUpdate = props.onInterventionUpdate
    this.onInterventionCreate = props.onInterventionCreate
    this.onChartCompleted = props.onChartCompleted
    this.onEntryDateChange= props.onEntryDateChange
    this.onEntryValueChange= props.onEntryValueChange
    this.onChartTypeSelected = props.onChartTypeSelected
    this.onChartSectionSelect = props.onChartSectionSelect
    this.onSetStep = props.onSetStep
    this.onTextSectionSelect = props.onTextSectionSelect
    this.onElementAdded = props.onElementAdded
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      step: nextProps.step,
      entries: nextProps.entries,
      chart: nextProps.chart,
      interventions: nextProps.interventions,
      report: nextProps.report
    })
  }

  render(){
    const { step, chart, entries, inputRowLength, interventions, randomEntries, report } = this.state
    const { mode } = this.props

    return(
      <div className="engine-panel-wrapper builder-panel-wrapper">
        <Panels
          step={step}
          mode={mode}
          chart={chart}
          report={report}
          onSetStep={this.onSetStep}
          onElementAdded={this.onElementAdded}
          onChartTypeSelected={this.onChartTypeSelected}
          onChartSectionSelect={this.onChartSectionSelect}
          onTextSectionSelect={this.onTextSectionSelect}
        />
        <EnginePanel
          mode={mode}
          step={step}
          chart={chart}
          entries={entries}
          interventions={interventions}
          onSetStep={this.onSetStep}
          onDataSelected={this.onDataSelected}
          onInterventionCreate={this.onInterventionCreate}
          onInterventionUpdate={this.onInterventionUpdate}
          onChartCompleted={this.onChartCompleted}
          onEntryDateChange={this.onEntryDateChange}
          onEntryValueChange={this.onEntryValueChange}
        />
      </div>
    )
  }
}

export default BuilderPanel
