import PickyDateTime from 'react-picky-date-time';
import React, { Component } from 'react';
import ReactLightCalendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css'
import '../styles/calendar.css'
const DAY_LABELS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
const MONTH_LABELS = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aûot', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

class Calendar extends Component {
  constructor(props) {
    super(props)
    const date = new Date()
    const startDate = date.getTime()
    this.state = {
      startDate, // Today
      endDate: new Date(startDate).setDate(date.getDate() + 6) // Today + 6 days
    }
  }

  onChange = (startDate, endDate) => this.setState({ startDate, endDate })

  render = () => {
    const { startDate, endDate } = this.state
    const dist = (endDate-startDate)/86400000
    return (
        <div>
        <h1>Calendar</h1>
        <h2>Days Selected: {dist >= 0 ? dist : " "}</h2>
        <ReactLightCalendar id="cal" startDate={startDate} endDate={endDate} onChange={this.onChange} range displayTime />
        </div>
    )
  }
}

export default Calendar;