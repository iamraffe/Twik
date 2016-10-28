import Autosuggest from 'react-autosuggest'
import React, {PropTypes} from 'react'

const SelectUserForm = ({suggestions, inputProps, onSuggestionsUpdateRequested, getSuggestionValue, renderSuggestion, onSuggestionSelected, onPatientSelected}) => {
  return(
    <div className="naming-step">
      <header>
        <h1>Please select a patient from the database using the autocomplete form to continue</h1>
      </header>
      <form onSubmit={onPatientSelected}>
        <div className="input-group row">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsUpdateRequested={onSuggestionsUpdateRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={onSuggestionSelected}
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-light btn-form">
              Continue
            </button>
          </span>
        </div>
      </form>
    </div>
  )
}

SelectUserForm.propTypes = {
  suggestions: PropTypes.array.isRequired,
  inputProps: PropTypes.object.isRequired,
  onSuggestionsUpdateRequested: PropTypes.func.isRequired,
  getSuggestionValue: PropTypes.func.isRequired,
  renderSuggestion: PropTypes.func.isRequired,
  onSuggestionSelected: PropTypes.func.isRequired,
  onPatientSelected: PropTypes.func.isRequired,
}

export default SelectUserForm