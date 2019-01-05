import browser from 'webextension-polyfill'
import Notification from 'global/clients/notification'
import Storage from 'global/clients/storage'
import {ALARM_STORAGE} from 'global/constants/config'

browser.browserAction.setBadgeBackgroundColor({color: '#6ECAB0'})

browser.runtime.onInstalled.addListener(() => {
    new Storage({name: ALARM_STORAGE})
})

browser.runtime.onStartup.addListener(() => {
    const alarmStorage = new Storage({name: ALARM_STORAGE})

    alarmStorage.get().then((storedAlarms) => {
        const now = Date.now()
        const alarms = Object.values(storedAlarms)

        // Remove any expired alarms on startup
        const activeAlarms = alarms.filter(({id, when}) => {
            const isActive = when > now
            !isActive && alarmStorage.delete({key: id})
            return isActive
        })

        activeAlarms.length && browser.browserAction.setBadgeText({text: ' ⌛️'})
    })
})

browser.alarms.onAlarm.addListener((alarm) => {
    const alarmStorage = new Storage({name: ALARM_STORAGE})
    alarmStorage.delete({key: alarm.name})

    Notification.show()
    browser.browserAction.setBadgeText({text: ''})
})
