import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Calendar, defaultStyle } from 'react-native-calendars'

const XDate = require('xdate');

type Props = {
  initialRange: React.PropTypes.array.isRequired,
  onSuccess: React.PropTypes.func.isRequired,
};
export default class DateRangePicker extends Component<Props> {

  state = {isFromDatePicked: false, isToDatePicked: false, markedDates: {}}

  componentDidMount() { this.setupInitialRange() }

  onDayPress = (day) => {
    if (!this.state.isFromDatePicked || (this.state.isFromDatePicked && this.state.isToDatePicked)) {
      this.setupStartMarker(day)
    } else if (!this.state.isToDatePicked) {
      let markedDates = {...this.state.markedDates}
      let [mMarkedDates, range] = this.setupMarkedDates(this.state.fromDate, day.dateString, markedDates)
      if (range >= 0) {
        this.setState({isFromDatePicked: true, isToDatePicked: true, markedDates: mMarkedDates})
        this.props.onSuccess(this.state.fromDate, day.dateString)
      } else {
        this.setupStartMarker(day)
      }
    }
  }

  setupStartMarker = (day) => {
    let markedDates = {[day.dateString]: {startingDay: true, color: this.props.theme.markColor, textColor: this.props.theme.markTextColor}}
    this.setState({isFromDatePicked: true, isToDatePicked: false, fromDate: day.dateString, markedDates: markedDates})
  }

  setupMarkedDates = (fromDate, toDate, markedDates) => {
    let mFromDate = new XDate(fromDate)
    let mToDate = new XDate(toDate)
    let range = mFromDate.diffDays(mToDate)
    if (range >= 0) {
      if (range == 0) {
        markedDates = {[toDate]: {color: this.props.theme.markColor, textColor: this.props.theme.markTextColor}}
      } else {
        for (var i = 1; i <= range; i++) {
          let tempDate = mFromDate.addDays(1).toString('yyyy-MM-dd')
          if (i < range) {
            markedDates[tempDate] = {color: this.props.theme.markColor, textColor: this.props.theme.markTextColor}
          } else {
            markedDates[tempDate] = {endingDay: true, color: this.props.theme.markColor, textColor: this.props.theme.markTextColor}
          }
        }
      }
    }
    return [markedDates, range]
  }

  setupInitialRange = () => {
    if (!this.props.initialRange) return
    let [fromDate, toDate] = this.props.initialRange
    let markedDates = {[fromDate]: {startingDay: true, color: this.props.theme.markColor, textColor: this.props.theme.markTextColor}}
    let [mMarkedDates, range] = this.setupMarkedDates(fromDate, toDate, markedDates)
    this.setState({markedDates: mMarkedDates, fromDate: fromDate})
  }

  render() {
    return (
      <Calendar {...this.props}
                markingType={'period'}
                current={this.state.fromDate}
                markedDates={this.state.markedDates}
                onDayPress={(day) => {this.onDayPress(day)}}/>
    )
  }
}

DateRangePicker.defaultProps = {
  theme: { markColor: '#00adf5', markTextColor: '#ffffff' }
};
