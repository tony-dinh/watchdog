<div align="center">
    <img alt="Watchdog Icon" src="./app/static/assets/icon@1x.png">
</div>

# Watchdog
An over-engineered browser extension for setting a simple timer. Built using [ReactJS](https://github.com/facebook/react) and [EmotionJS](https://github.com/emotion-js/emotion).


## Screenshots
<div align="center">
    <img height=350 width=350 alt="Watchdog Icon" src="./screenshots/watchdog.gif">
</div>

## Development

1. Build the extension
    ```bash
    $ npm i && npm run build:dev
    ```

2. Load your develop bundle into [Chrome](https://developer.chrome.com/extensions/getstarted) or [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Temporary_Installation_in_Firefox) to test locally.

**NOTE**: You can also develop using the webpack server by running `npm start` and visiting `localhost:9000?popup=true` in your browser but you will not have access to the browser extensions API.
