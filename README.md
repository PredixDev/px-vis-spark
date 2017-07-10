#px-vis-spark [![Build Status](https://travis-ci.org/PredixDev/px-vis-spark.svg?branch=master)](https://travis-ci.org/PredixDev/px-vis-spark)


## Overview

px-vis-spark is a Predix UI component that provides a visualization element usually referred to as sparkline - a small line chart without axes or measures that provides a user a glimpse of a trend. Additional options exist for displaying a simple bar chart (with all positive values) or a simple win/loss chart (with positive and negative values).

## Usage

### Prerequisites
1. node.js
2. npm
3. bower
4. [webcomponents-lite.js polyfill](https://github.com/webcomponents/webcomponentsjs)

Node, npm and bower are necessary to install the component and dependencies. webcomponents.js adds support for web components and custom elements to your application.

## Getting Started

First, install the component via bower on the command line.

```
bower install px-vis-spark --save
```

Second, import the component to your application with the following tag in your head.

```
<link rel="import" href="/bower_components/px-vis-spark/px-vis-spark.html"/>
```

Finally, use the component in your application:

```
<px-vis-spark type="line" width="250" height="40" data='[{"x":0,"y":0},...]'></px-vis-spark>
// and/or:
<px-vis-spark type="bar" width="250" height="50" data="[1,2,3]"></px-vis-spark>
// and/or:
<px-vis-spark type="winLoss" width="300" height="50" data="[1,-2,3]"></px-vis-spark>
```

<br />
<hr />

## Documentation

Read the full API and view the demo here (coming soon).

The documentation in this repository is supplemental to the official Predix documentation, which is continuously updated and maintained by the Predix documentation team. Go to [http://predix.io](http://predix.io)  to see the official Predix documentation.


## Local Development

From the component's directory...

```
$ npm install
$ bower install
$ gulp sass
```

From the component's directory, to start a local server run:

```
$ gulp serve
```

The root of that server (e.g. http://localhost:8080/) will automatically open in your default browser with the API documentation page and interactive working examples.

`gulp serve` also runs `gulp watch` concurrently so that when you make a change to your source files and save them, your preview will be updated in any browsers you have opened and turned on in LiveReload.

### GE Coding Style Guide
[GE JS Developer's Guide](https://github.com/GeneralElectric/javascript)

<br />
<hr />

## Known Issues

Please use [Github Issues](https://github.com/PredixDev/px-vis-spark/issues) to submit any bugs you might find.
