import React from 'react'
import Popup from 'components/popup'
import FullView from 'components/full-view'

import Alarm from 'global/clients/alarm'
import Storage from 'global/clients/storage'
import {ALARM_STORAGE} from 'global/constants/config'

class App extends React.PureComponent {
    // ===============================
    //  INSTANCE METHODS & PROPERTIES
    // ===============================

    constructor(props) {
        super(props)

        this.state = {alarm: null}

        // Determine whether the app is loaded as a popup or as the full view
        // extension URL is set with search param `popup=(true|false)`.
        const searchQuery = window.location.search
        const searchParams = new URLSearchParams(searchQuery)
        this.isPopup = Boolean(searchParams.get('popup'))
    }

    componentDidMount() {
        const alarmStorage = new Storage({name: ALARM_STORAGE})

        // Once ths app has mounted, check the alarm store for any active
        // alarms. Remove expired ones and restore active ones.
        alarmStorage.get().then((storedAlarms) => {
            const now = Date.now()
            const alarms = Object.values(storedAlarms)
            const activeAlarms = alarms.filter(({id, when}) => {
                const isActive = when > now
                !isActive && alarmStorage.delete({key: id})
                return isActive
            })

            if (!activeAlarms.length) {
                return
            }

            this.setState({alarm: activeAlarms[0]})
        })
    }

    onAlarmSet = ({duration}) => {
        // When an alarm is set for N duration (ms), we will create a new
        // `Alarm` instance which will be added to the browser alarms & storage
        this.setState({alarm: new Alarm({duration})})
    }

    onAlarmEnd = () => {
        // When an alarm expires, we will end the existing `Alarm` instance
        // which will remove it from the browser alarms & storage
        this.state.alarm.end().then(() => {
            this.setState({alarm: null})
        })
    }

    render() {
        const {alarm} = this.state
        const Template = this.isPopup ? Popup : FullView

        return (
            <Template
                alarm={alarm}
                onAlarmSet={this.onAlarmSet}
                onAlarmEnd={this.onAlarmEnd}
            />
        )
    }
}

export default App
