import browser from 'webextension-polyfill'
import Notification from 'global/clients/notification'
import Storage from 'global/clients/storage'
import {ALARM_STORAGE} from 'global/constants/config'

browser.runtime.onInstalled.addListener(() => {
    new Storage({name: ALARM_STORAGE})
})

browser.alarms.onAlarm.addListener(() => {
    Notification.show()
})
