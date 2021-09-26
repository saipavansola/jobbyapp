import {Component} from 'react'

class FilterGroup extends Component {
  selectType = id => {
    const {onCheck} = this.props
    onCheck(id)
  }

  onSelectSalary = id => {
    const {onSalary} = this.props
    onSalary(id)
  }

  renderTypes = () => {
    const {employmentTypesList} = this.props
    return (
      <div>
        <h1>Type of Employment</h1>
        <ul className="ulOrder">
          {employmentTypesList.map(each => (
            <li key={each.employmentTypeId}>
              <input
                onClick={() => this.selectType(each.employmentTypeId)}
                type="checkbox"
                id={each.employmentTypeId}
              />
              <label htmlFor={each.employmentTypeId}>{each.label}</label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderRanges = () => {
    const {salaryRangesList} = this.props
    return (
      <div>
        <h1>Salary Range</h1>

        <ul className="ulOrder">
          {salaryRangesList.map(each => (
            <li key={each.salaryRangeId}>
              <input
                onChange={() => this.onSelectSalary(each.salaryRangeId)}
                type="radio"
                id={each.salaryRangeId}
                name="salary"
              />
              <label htmlFor={each.salaryRangeId}>{each.label}</label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderTypes()}
        <hr />
        {this.renderRanges()}
      </div>
    )
  }
}

export default FilterGroup
