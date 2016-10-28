import React, { PropTypes } from 'react'
import moment from 'moment'
import Autosuggest from 'react-autosuggest'

import ChartBox from '../ChartBox'
import Wiz from './AIM/Wiz'

  const chartTypes = [
    "Afp",
    "Alt",
    "Bmi Age",
    "Calcium",
    // "Cholesterol",
    "Copper",
    "Creatine",
    "Diastolic Blood Pressure",
    "Ferritin",
    "Folate",
    "Hemoglobin A1c",
    "Insulin",
    "Iron",
    "Mercury",
    "Red Blood Cell Count",
    "Stature Age",
    "Systolic Blood Pressure",
    "Testosterone",
    "Tsh",
    "Uric Acid",
    "Viral Load",
    "Vitamin B12",
    "Vitamin D",
    "Weight Age",
    "Weight Age Infant",
    "White Blood Cell Count"
  ]

class Panels extends React.Component{
  constructor(props, context){
    super(props, context)

    this.state = {
      report: props.report,
      step: props.step,
      value: '',
      suggestions: []
    }

    this.onSetStep = props.onSetStep
    this.onElementAdded = props.onElementAdded
    this.onChartTypeSelected = props.onChartTypeSelected
    this.onChartSectionSelect = props.onChartSectionSelect
    this.onTextSectionSelect = props.onTextSectionSelect
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      step: nextProps.step,
      report: nextProps.report
    })
  }

  onChartSearchChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  matchUserToTerm = (state, value) => {
    return (
      state.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  }

  getSuggestionValue = (suggestion) => {
    return `${suggestion}`
  }

  getSuggestions = (value) => {
    const { charts } = this.state.report
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    const newCharts = _.xor(chartTypes, _.map(charts, (chart) => {return _.startCase(chart.type)}))
    const oldCharts = _.map(charts, (chart) => `${_.startCase(chart.type)}`)
    const suggestions = _.sortBy(_.concat(_.map(newCharts, (chart) => `${chart}`), oldCharts), (o) => {return o})

    if(inputLength === 0){
      return newCharts
    }
    return _.filter(suggestions, (chart) => {
      return this.matchUserToTerm(chart, value)
    })
  }

  onSuggestionsUpdateRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  renderSuggestion = (suggestion) => {
    return (
      <span>{`${suggestion.toUpperCase()}`}</span>
    )
  }

  onSuggestionSelected = (event, { suggestion, suggestionValue, sectionIndex, method }) => {
    this.setState({
      value: '',
      suggestions: []
    })
    this.onChartTypeSelected(suggestion)
  }


  render(){
    const { step, suggestions, value, report } = this.state
    const { chart } = this.props
    const inputProps = {
      placeholder: chart.type === null ? 'Search...' : chart.type,
      value: value,
      onChange: this.onChartSearchChange
    }

    return(
      <div>
        {step === 'chartType' &&
          <div>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
              onSuggestionSelected={this.onSuggestionSelected}
            />
            <ul className="list-unstyled" style={{margin: '25px auto 15px'}}>
              {_.map(_.sortBy(report.charts, (o) => {return o.type}), (chart, index) => {
                // console.log("CHART CHARTB", chart)
                return (
                  <ChartBox
                    type={chart.type}
                    key={chart.type}
                    entries={chart.entries}
                    interventions={chart.interventions}
                    index={index}
                    user={chart.user}
                    onSetStep={this.onSetStep}
                    onElementAdded={this.onElementAdded}
                  />
                )
              })}
            </ul>
          </div>
        }
        {step === 'section' &&
          <div className="chart-current-step">
            <button
              type="button"
              className="previous-step-toolbox close"
              onClick={() => this.onSetStep('chartType')}
              >
              <span className="fa fa-long-arrow-left"></span>
            </button>
            <header className="toolbox-panel-header">
              <h1>Where should we add this chart?</h1>
            </header>
            <ul className="list-unstyled">
              {
                _.map(report.content, (section, i) => {
                  return (
                    <li className="section-option"
                      key={i}
                      onClick={() => this.onChartSectionSelect(i, report.size)}
                      style={{marginBottom: 15}}
                    >
                      <button
                        className="btn btn-light btn-block btn-slim"
                        style={{
                          cursor: 'pointer'
                        }}
                      >
                        {section.title}
                      </button>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        }
        {step === 'text' &&
          <div className="chart-current-step">
            <header className="toolbox-panel-header">
              <h1>Where should we add this text?</h1>
            </header>
            <ul className="list-unstyled">
              {
                _.map(report.content, (section, i) => {
                  return (
                    <li className="section-option"
                      key={i}
                      onClick={() => this.onTextSectionSelect(i, report.size)}
                      style={{marginBottom: 15}}
                    >
                      <button
                        className="btn btn-light btn-block btn-slim"
                        style={{
                          cursor: 'pointer'
                        }}
                      >
                        {section.title}
                      </button>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        }
        {step === 'aim' && <Wiz/>
        }
      </div>
    )
  }
}

export default Panels
