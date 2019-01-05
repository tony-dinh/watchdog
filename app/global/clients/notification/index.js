import browser from 'webextension-polyfill'

class Notification {
    static show = () => {
        const id = `${Date.now()}`
        const notification = {
            type: 'basic',
            title: 'Watchdog',
            iconUrl: 'assets/icon@2x.png',
            message: 'Time is up!'
        }

        return browser.notifications.create(id, notification)
    }
}

export default Notification
