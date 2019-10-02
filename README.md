# Cleanup stuck call plugin

This plugin addresses some issues related with stuck calls.

1. It displays a notification that allows a worker to hangup a _frozen_ task.
1. Automatically hangups broken calls before accepting a new call tasks or before starting monitoring a call.


## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com) installed.

Afterwards, install the dependencies by running `npm install`:

```bash
cd flex-plugin-cleanup-stuck-calls/

# If you use npm
npm install
```

## Build and deploy

Run the following command to start the bundling:

```bash
npm run build
```

Afterwards, you'll find in your project a `build/` folder that contains a file with the name of your plugin project. For example, `plugin-example.js`. Take this file and upload it into the Assets part of your Twilio Runtime.

More info about deployment [here](https://www.twilio.com/docs/flex/deploying-plugins#deploying-flex-plugins-to-twilio-assets).

Note: Common packages like `React`, `ReactDOM`, `Redux` and `ReactRedux` are not bundled with the build because they are treated as external dependencies so the plugin will depend on Flex to provide them globally.