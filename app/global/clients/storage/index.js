import browser from 'webextension-polyfill'

class Storage {
    /* @type String */
    name

    constructor({name} = {}) {
        this.name = name

        browser.storage.sync
            .get()
            .then((storage) => {
                if (!(name in storage)) {
                    storage[name] = {}
                    browser.storage.sync.set(storage)
                }
            })
    }

    get = ({key} = {}) => (
        browser.storage.sync
            .get(this.name)
            .then((storage) => key ? storage[this.name][key] : storage[this.name])
    )

    set = ({key, value}) => (
        browser.storage.sync
            .get(this.name)
            .then((storage) => {
                storage[this.name][key] = value
                return browser.storage.sync.set(storage)
            })
    )

    delete = ({key}) => (
        browser.storage.sync
            .get(this.name)
            .then((storage) => {
                delete storage[this.name][key]
                return browser.storage.sync.set(storage)
            })
    )
}

export default Storage
