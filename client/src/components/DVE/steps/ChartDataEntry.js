import React, { PropTypes } from 'react'
import { Motion, spring } from 'react-motion'

import DataGrid from '../../selectData/DataGrid'

class ChartDataEntry extends React.Component{
  constructor(props, context){
    super(props, context)

    this.state = {
      step: props.step,
      chart: props.chart,
      entries: props.entries,
      interventions: props.interventions,
      inputRowLength: props.inputRowLength,
      randomEntries: props.randomEntries,
      copyNPasting: false
    }

    this.onDeleteInputRow = props.onDeleteInputRow
    this.onAddInputRow = props.onAddInputRow
    this.onGenerateRandom = props.onGenerateRandom
    this.onEntryEdited = props.onEntryEdited
    this.onDataSelected = props.onDataSelected
    this.onStartOver =  props.onStartOver
    this.onSetStep = props.onSetStep
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      randomEntries: nextProps.randomEntries,
      chart: nextProps.chart,
      entries: nextProps.entries,
      interventions: nextProps.interventions,
      inputRowLength: nextProps.inputRowLength
    })
  }

  onCopyNPastingToggle = () => {
    this.setState({
      copyNPasting: !this.state.copyNPasting
    })
  }

  onCopyPasteData = (e) => {
    this.props.onCopyPasteData(e)
    this.setState({
      copyNPasting: false
    })
    e.target.value = ''
  }

  render(){
    const { mode } = this.props
    const { copyNPasting, step, chart, entries, inputRowLength, interventions, randomEntries } = this.state

    return(
      <section className="chart-current-step">
        {mode !== 'redirect' &&
          <button
            type="button"
            className="previous-step-toolbox close"
            onClick={() => this.onSetStep('section')}
            >
            <span className="fa fa-long-arrow-left"></span>
          </button>}
        <div className="adding-step">
          <header className="row">
            <h1>Please add the {chart.type} data for: <span className="patient-name"> {`${chart.user.first_name} ${chart.user.last_name}`}</span></h1>
            <h2>Make sure to include the date for each test.</h2>
          </header>
          <Motion style={{padding: copyNPasting ? 8 : 0, height: spring(copyNPasting ? 150 : 0)}}>
            {({height, padding}) =>
              <textarea style={{height, padding, border: 'none', background: '#D7D2CC', color: 'black'}} className="form-control" onChange={this.onCopyPasteData}></textarea>
            }
          </Motion>
          <button
            className="btn btn-block btn-light btn-slim"
            onClick={this.onCopyNPastingToggle}
            style={{marginBottom: 10}}
          >
            {copyNPasting ? `Input Manually` : `Copy/Paste Data`}
          </button>

          <form id="data-grid" onSubmit={this.onDataSelected}>
            <DataGrid
              chart={chart}
              entries={chart.entries.length > 0 ? chart.entries : entries}
              inputRowLength={inputRowLength}
              randomEntries={randomEntries}
              onDeleteInputRow={this.onDeleteInputRow}
              onAddInputRow={this.onAddInputRow}
              onEntryEdited={this.onEntryEdited}
            />
          </form>
          {randomEntries.length > 0 &&
            <button
              className="btn btn-block btn-light btn-slim"
              onClick={this.onStartOver}
              style={{marginBottom: 10}}
            >
              Start Over
            </button>
          }
        </div>
      </section>
    )
  }
}

export default ChartDataEntry
