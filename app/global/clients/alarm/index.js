import browser from 'webextension-polyfill'
import Storage from 'global/clients/storage'
import {ALARM_STORAGE} from 'global/constants/config'

const alarmStorage = new Storage({name: ALARM_STORAGE})

class Alarm {
    /**
     * @param {Object} config - the configurations for the alarm
     * @param {Number} config.duration - the duration (ms) until the alarm is triggered
     */
    constructor({duration}) {
        this._alarm = {
            id: `${Date.now()}`,
            duration,
            when: Date.now() + duration
        }

        browser.alarms.create(this.id, {when: this.when})
        alarmStorage.set({key: this.id, value: this._alarm})
    }

    get id() {
        return this._alarm.id
    }

    get duration() {
        return this._alarm.duration
    }

    get when() {
        return this._alarm.when
    }

    end = () => (
        Promise.all([
            alarmStorage.remove({key: this.id}),
            browser.alarms.clear(this.name)
        ])
    )
}

export default Alarm
