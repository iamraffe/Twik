import React, {PropTypes} from 'react'
import lodash from 'lodash'
import Input from './Input'

const InputRow = ({index, id, chart, symbol, value, date, onDeleteInputRow, onEntryEdited}) => {
  // console.log("fac ", index, id, chart, symbol, value, date)
  // debugger;
  return(
    <tr className="input-row">
      <td>
        <span id={`fa-${index}`} className="fa-stack input-row-delete fa-lg"  onClick={onDeleteInputRow}>
          <i className="fa fa-circle fa-stack-2x"></i>
          <i className="fa fa-times fa-stack-1x fa-inverse"></i>
        </span>
        <Input
          type="date"
          date={date[0]}
          index={index}
          value={value}
          onEntryEdited={onEntryEdited}
        />
      </td>
      {_.map(chart.symbols, (symbol, i) => {
        // console.log(value[i])
        return (
          <td key={`${symbol}-${i}`} className={`chart-entry-size-${chart.symbols.length}`}>
            <input type="hidden" name={`id--${symbol}--${index}`} value={id[i] ? id[i].id : "undefined"} />
            <Input
              type="number"
              index={index}
              id={id[i] ? id[i].id : "undefined"}
              symbol={symbol}
              value={value[i] ? value[i].value : "undefined"}
              date={date[0]}
              chart={chart}
              onEntryEdited={onEntryEdited}
            />
          </td>
        )
      })}
    </tr>
  )
}

InputRow.propTypes = {
  index: PropTypes.string.isRequired,
  id: PropTypes.array,
  symbol: PropTypes.string,
  value: PropTypes.array,
  date: PropTypes.array,
  chart: PropTypes.object,
  onDeleteInputRow: PropTypes.func.isRequired
}

export default InputRow
