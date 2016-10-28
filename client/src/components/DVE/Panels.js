import React, { PropTypes } from 'react'

import ChartUserSelection from './steps/ChartUserSelection'
import ChartDataEntry from './steps/ChartDataEntry'
import ChartCustomization from './steps/ChartCustomization'
import ChartConfirmation from './steps/ChartConfirmation'

class Panels extends React.Component{
  constructor(props, context){
    super(props, context)

    this.state = {
      step: props.step,
      chart: props.chart,
      entries: props.entries,
      interventions: props.interventions,
      inputRowLength: props.inputRowLength,
      randomEntries: props.randomEntries,
      users: props.users
    }

    this.onUserSelected = props.onUserSelected
    this.onDeleteInputRow = props.onDeleteInputRow
    this.onAddInputRow = props.onAddInputRow
    this.onGenerateRandom = props.onGenerateRandom
    this.onEntryEdited = props.onEntryEdited
    this.onDataSelected = props.onDataSelected
    this.onInterventionCreate = props.onInterventionCreate
    this.onInterventionUpdate = props.onInterventionUpdate
    this.onChartCompleted = props.onChartCompleted
    this.onSetStep = props.onSetStep
    this.onCopyPasteData =  props.onCopyPasteData
    this.onStartOver =  props.onStartOver
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      step: nextProps.step,
      randomEntries: nextProps.randomEntries,
      chart: nextProps.chart,
      entries: nextProps.entries,
      interventions: nextProps.interventions,
      users: nextProps.users,
      inputRowLength: nextProps.inputRowLength
    })
  }

  render(){
    const { mode } = this.props
    const { step, chart, entries, inputRowLength, interventions, randomEntries, users } = this.state

    return (
      <div>
        {step === 'users' &&
          <ChartUserSelection
            users={users}
            chart={chart}
            onUserSelected={this.onUserSelected}
          />
        }
        {step === 'data' &&
          <ChartDataEntry
            chart={chart}
            mode={mode}
            entries={chart.entries.length > 0 ? chart.entries : entries}
            inputRowLength={inputRowLength}
            randomEntries={randomEntries}
            onSetStep={this.onSetStep}
            onDataSelected={this.onDataSelected}
            onDeleteInputRow={this.onDeleteInputRow}
            onAddInputRow={this.onAddInputRow}
            onEntryEdited={this.onEntryEdited}
            onCopyPasteData={this.onCopyPasteData}
            onStartOver={this.onStartOver}
          />
        }
        {step === 'interventions' &&
          <ChartCustomization
            chart={chart}
            mode={mode}
            index={_.filter(interventions, (i) => { return i.chart_type === chart.type}).length+1}
            onSetStep={this.onSetStep}
            onInterventionUpdate={this.onInterventionUpdate}
            onInterventionCreate={this.onInterventionCreate}
          />
        }
        {step === 'confirmation' &&
          <ChartConfirmation
            chart={chart}
            onSetStep={this.onSetStep}
            onChartCompleted={this.onChartCompleted}
          />
        }
      </div>
    )
  }
}

export default Panels
