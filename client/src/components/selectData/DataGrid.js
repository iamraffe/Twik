import React, {PropTypes} from 'react'
import lodash from 'lodash'
import moment from 'moment'

import InputRow from './InputRow'

class DataGrid extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      entries: props.entries,
      chart: props.chart,
      inputRowLength: props.inputRowLength,
      randomEntries: props.randomEntries
    }

    this.onEntryEdited = props.onEntryEdited
    this.onAddInputRow = props.onAddInputRow
    this.onGenerateRandom = props.onGenerateRandom
    this.onDeleteInputRow = props.onDeleteInputRow
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      entries: nextProps.entries,
      chart: nextProps.chart,
      inputRowLength: nextProps.inputRowLength,
      randomEntries: nextProps.randomEntries
    })
  }

  groupEntries = (size, entries) => {
    return _.groupBy(entries, (d, i) => { return d.date })
  }

  propEntryId = (size, entry) => {
    return _.sortBy(entry, e => {return e.symbol})
  }

  propEntryValue = (size, entry) => {
    return _.sortBy(entry, e => {return e.symbol})
  }

  range = () => {
    const { entries, chart, inputRowLength, randomEntries } = this.state
    return _.range(inputRowLength-entries.length-randomEntries.length+1)
  }

  filter = () => {
    const { entries, chart, inputRowLength, randomEntries } = this.state
    return _.filter(this.range(), (o) => {
      return o > 0
    })
  }

  render(){
    const { entries, chart, inputRowLength, randomEntries } = this.state

    return (
      <div className="row">
        <table className="table data-grid-table">
          <tbody>
            {_.map(this.groupEntries(chart.symbols.length, entries), (entry, i) => {
              return <InputRow
                      key={i}
                      chart={chart}
                      index={i.toString()}
                      {...entry}
                      id={this.propEntryId(chart.symbols.length, entry)}
                      value={this.propEntryValue(chart.symbols.length, entry)}
                      date={[moment(new Date(i))]}
                      onDeleteInputRow={this.onDeleteInputRow}
                      onEntryEdited={this.onEntryEdited}
                    />
            })}
            {_.map(this.groupEntries(chart.symbols.length, randomEntries), (entry, i) => {
                        return <InputRow
                                key={i}
                                chart={chart}
                                index={i.toString()}
                                id={[undefined]}
                                value={this.propEntryValue(chart.symbols.length, entry)}
                                date={[moment(new Date(i))]}
                                onDeleteInputRow={this.onDeleteInputRow}
                                onEntryEdited={this.onEntryEdited}
                              />
            })}
            {
              this.filter().map((entry, i) => {
                // console.log("ENTRY", entry)
                return <InputRow
                        key={i}
                        chart={chart}
                        id={[undefined]}
                        date={[undefined]}
                        value={[undefined]}
                        index={(entries.length+i).toString()}
                        onDeleteInputRow={this.onDeleteInputRow}
                        onEntryEdited={this.onEntryEdited}
                      />
            })
            }
          </tbody>
        </table>
        <button className="add-row btn btn-slim btn-light btn-block" onClick={this.onAddInputRow}>Add row</button>
        <button type="submit" className="btn-continue btn btn-slim btn-light btn-block" style={{marginBottom: "25px",  marginTop: "5px"}} >Continue</button>
      </div>
    )
  }
}

DataGrid.propTypes = {
  entries: PropTypes.array.isRequired,
  onAddInputRow: PropTypes.func.isRequired,
  onDeleteInputRow: PropTypes.func.isRequired,
  inputRowLength: PropTypes.number.isRequired,
  randomEntries: PropTypes.array.isRequired,
  onEntryEdited: PropTypes.func.isRequired
}

export default DataGrid
