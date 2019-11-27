/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/*
    Relative paths assume component is being run from inside an app or another component, where dependencies are flat
    siblings. When this component is run from its own repo (e.g. tests, examples), we assume the server is started with
    'gulp serve' (or similar server setup) to enable correct finding of bower dependencies for local runs.
*/
/**

### Usage

    <px-vis-spark type="line" width="250" height="40" data='[{"x":0,"y":0},...]'></px-vis-spark>
    <px-vis-spark type="bar" width="250" height="50" data="[1,2,3]"></px-vis-spark>
    <px-vis-spark type="winLoss" width="300" height="50" data="[1,-2,3]"></px-vis-spark>

### Styling
The following custom properties are available for styling:

Custom property | Description
----------------|-------------
`--px-vis-series-color-0` | Color of the line and area

`--px-vis-font-family` | The font family for all labels and text

@element px-vis-spark
@blurb A visualization element usually referred to as a sparkline - a small line chart or bar chart without axes or measures that provides a user a glimpse of a trend.
@homepage index.html
@demo demo.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import './css/px-vis-spark-styles.js';
import 'px-vis/px-vis-line-svg.js';
import 'px-vis/px-vis-scale.js';
import 'px-vis/px-vis-svg.js';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import 'px-simple-win-loss-chart/px-simple-win-loss-chart.js';
import 'px-vis/px-vis-behavior-common.js';
import 'px-vis/px-vis-behavior-d3.js';
import 'px-vis/px-vis-area-svg.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  _template: html`
    <style include="px-vis-spark-styles"></style>
    <template is="dom-if" if="{{data}}">
      <div id="wrapper" class="wrapper flex">
        <template is="dom-if" if="{{_isEqual(type,'line')}}">
          <px-vis-svg width="[[width]]" height="[[height]]" svg="{{svg}}">
          </px-vis-svg>
          <px-vis-scale x-axis-type="time" y-axis-type="linear" complete-series-config="[[_seriesConfig]]" data-extents="[[_extents]]" width="[[width]]" height="[[height]]" chart-data="[[data]]" x="{{x}}" y="{{y}}" domain-changed="{{domainChanged}}">
          </px-vis-scale>
          <px-vis-line-svg svg="[[svg]]" series-id="spark" chart-data="[[data]]" complete-series-config="[[_seriesConfig]]" x="[[x]]" y="[[y]]" domain-changed="[[domainChanged]]">
          </px-vis-line-svg>
          <template is="dom-if" if="{{!disableGradient}}" restamp="">
            <px-vis-area-svg svg="[[svg]]" series-id="spark" complete-series-config="[[_areaConfig]]" chart-data="[[_stackData]]" x="[[x]]" y="[[y]]" domain-changed="[[domainChanged]]">
            </px-vis-area-svg>
          </template>
        </template>
        <template is="dom-if" if="{{_isEqual(type,'bar')}}">
          <px-simple-win-loss-chart class="simpleBar" chart-data="{{data}}" width="{{width}}" height="{{height}}">
          </px-simple-win-loss-chart>
        </template>
        <template is="dom-if" if="{{_isEqual(type,'winLoss')}}">
          <px-simple-win-loss-chart class="simpleWinLoss" chart-data="{{data}}" width="{{width}}" height="{{height}}">
          </px-simple-win-loss-chart>
        </template>
      </div>
    </template>
`,

  is: 'px-vis-spark',

  behaviors: [
    IronResizableBehavior,
    PxColorsBehavior.dataVisColorTheming,
    PxColorsBehavior.getSeriesColors,
    PxVisBehaviorD3.domainUpdate,
    PxVisBehavior.updateStylesOverride,
    PxVisBehavior.commonMethods
  ],

  properties: {
    /**
     * Type of spark - one of "line", "bar" or "winLoss".
     *
     * @property type
     * @type String
     * @default "line"
     */
    type: {
      type: String,
      value: "line"
    },
    /**
     * A JSON array of data that will be drawn in the spark.
     * Spark type 'line' requires data in the format `[{"x":0, "y":0},...]`.
     * Spark type 'bar' requires a single series of positive values in the format `[1,2,3]`.
     * Spark type 'winLoss' requires a single series of positive/negative values in the format `[1,-2,3]`.
     *
     * @property data
     * @type Array
     * @default []
     */
    data: {
      type: Array,
      value: function() {
        return [];
      },
      observer: '_dataChanged'
    },
    _stackData: {
      type: Object,
      computed: '_computeStack(data.*, type)'
    },
    /**
     * Whether the vis-spark should resize as window size is adjusted.
     * @property preventResize
     * @type Boolean
     * @value false
     */
    preventResize:{
      type: Boolean,
      value: false
    },
    /**
    * Width of the spark.
    * @prop width
    * @type String
    */
    width: {
      type: String,
      value: "300"
    },
    /**
    * Height of the spark.
    * @prop height
    * @type String
    */
    height: {
      type: String,
      value: "50"
    },
    _seriesConfig: {
      type: Object
    },
    _extents: {
      type: Object,
      value: function() {
        return {
          "x": [Infinity,-Infinity],
          "y": [Infinity,-Infinity]
        }
      }
    },
    _gradient: {
      type: Object
    },
    _gradientStop1: {
      type: Object
    },
    _gradientStop2: {
      type: Object
    },
    _gradientStop3: {
      type: Object
    },
    disableGradient: {
      type: Boolean,
      value: false
    }
  },

  listeners: {
    'iron-resize': '_onIronResize',
    "px-data-vis-colors-applied" : '_generateSeriesConfig'
  },

  observers: [
    'createGradient(svg, _areaConfig)',
    '_adjustGradients(domainChanged)'
  ],

  _onIronResize: function() {
    if(this.preventResize || this.preventResize === undefined) {
      return;
    }

    this.debounce('ironresize', function() {
      var wrapperRect = this.$$('#wrapper').getBoundingClientRect();
      this.set('width', Math.max(wrapperRect.width,0));
      this.set('height', Math.max(wrapperRect.height,0));
    },50);
  },

  _isEqual: function(a, b) {
    return a===b;
  },

  _dataChanged: function() {
    this.set("_extents", {"x": [Infinity,-Infinity],"y": [Infinity,-Infinity]});
  },

  _generateSeriesConfig: function() {
    this.set('_seriesConfig', {
      'spark': {
        "name":"spark",
        "x": 'x',
        "y": 'y',
        'color': this._getColor(0)
      }
    });
    this.set('_areaConfig', {
      'spark': {
        "name":"spark",
        "x": 'x',
        "y": 'y',
        'color': 'url(#sparkGradient)'
      }
    });
  },

  _computeStack: function() {
    if(!this.data || this.data.length === 0) { return; }

    if(this.type !== 'line') {
      return [];
    }

    var stack = Px.d3.stack();
    stack.keys(['y']);
    return stack(this.data);
  },

  createGradient: function() {
    if(this._isD3Empty(this.svg)) {
      return;
    }

    if(!this._gradient) {
      this._gradient = this.svg.append('defs').append('linearGradient')
        .attr('id', 'sparkGradient')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', 0)
        .attr('y2', 1);

      this._gradientStop1 = this._gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-opacity', '0.15');

      this._gradientStop2 = this._gradient.append('stop')
        .attr('stop-opacity', '0.05');

      this._gradientStop3 = this._gradient.append('stop')
        .attr('stop-opacity', '0.15');

      this._adjustGradients();
    }

    this._gradientStop1
      .attr('stop-color', this._getColor(0));
    this._gradientStop2
      .attr('stop-color', this._getColor(0));
      this._gradientStop3
      .attr('stop-color', this._getColor(0))
  },

  _adjustGradients: function() {
    if(!this.data || !this._gradientStop3) { return; }

    var isNeg = false;
    for(var i = 0; i < this.data.length; i++) {
      if(this.data[i]['y'] < 0) {
        isNeg = true;
      }
    }

    if(isNeg) {
      var y = this.y(0),
          r = this.y.range(),
          p = y / (r[0]-r[1]) * 100;

      this._gradientStop2.attr('offset', p + '%');
      this._gradientStop3.attr('offset', '100%');

    } else {
      this._gradientStop2.attr('offset', '70%');
      this._gradientStop3.attr('offset', '0%');

    }
  }
});
