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
/* Common imports */
/* Common demo imports */
/* Imports for this component */
/* Demo DOM module */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-demo/px-demo-header.js';
import 'px-demo/px-demo-api-viewer.js';
import 'px-demo/px-demo-footer.js';
import 'px-demo/px-demo-configs.js';
import 'px-demo/px-demo-props.js';
import 'px-demo/px-demo-interactive.js';
import 'px-demo/px-demo-component-snippet.js';
import 'px-demo/px-demo-code-editor.js';
import '../px-vis-spark.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <!-- Header -->
    <px-demo-header module-name="px-vis-spark" description="The px-vis-spark is a visualization element usually referred to as a sparkline - a small line or bar chart without axes or measures that provides a user a glimpse of a trend." mobile="" tablet="" desktop="">
    </px-demo-header>

    <!-- Interactive -->
    <px-demo-interactive>
      <!-- Configs -->
      <px-demo-configs slot="px-demo-configs" configs="[[configs]]" props="{{props}}" chosen-config="{{chosenConfig}}"></px-demo-configs>

      <!-- Props -->
      <px-demo-props slot="px-demo-props" props="{{props}}" config="[[chosenConfig]]"></px-demo-props>

      <!-- Code Editor -->
      <px-demo-code-editor slot="px-demo-code-editor" props="{{props}}"></px-demo-code-editor>

      <!-- Component ---------------------------------------------------------->
      <px-demo-component slot="px-demo-component">

        <div style="width:100%; height: 100%;">
          <px-vis-spark type="{{props.type.value}}" width="{{props.width.value}}" height="{{props.height.value}}" data="{{props.data.value}}" prevent-resize="{{props.preventResize.value}}" disable-gradient="{{props.disableGradient.value}}">
          </px-vis-spark>
        </div>
      </px-demo-component>
      <!-- END Component ------------------------------------------------------>

      <px-demo-component-snippet slot="px-demo-component-snippet" element-properties="{{props}}" element-name="px-vis-spark" codepen-link="https://glitch.com/edit/#!/px-vis-spark" suppress-property-values="[[suppressPropertyValues]]">
      </px-demo-component-snippet>
    </px-demo-interactive>

    <!-- API Viewer -->
    <px-demo-api-viewer source="px-vis-spark">
    </px-demo-api-viewer>

    <!-- Footer -->
    <px-demo-footer></px-demo-footer>
`,

  is: 'px-vis-spark-demo',

  properties: {

    props: {
      type: Object,
      value: function(){ return this.demoProps; }
    },

    configs: {
      type: Array,
      value: function(){
        return [
          {
            configName: "Line",
            configReset: true
          }, {
            configName: "Bar",
            data: [112,57,53,122,128,120],
            type: "bar"
          }, {
            configName: "Win Loss",
            data: [5,-4,3,-6,1,3,-4,3],
            type: "winLoss"
          }
        ]
      }
    },

    suppressPropertyValues: {
      type: Array,
      value: function() { return ['chartData']; }
    },

  },

  /**
   * A reference for `this.props`. Read the documentation there.
   */
  demoProps: {

    preventResize: {
      type: Boolean,
      defaultValue: true,
      inputType: 'toggle'
    },

    disableGradient: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },

    width: {
      type: Number,
      defaultValue: 300,
      inputType: 'text'
    },

    height: {
      type: Number,
      defaultValue: 100,
      inputType: 'text'
    },

    data: {
      type: Array,
      defaultValue: [
        {
          'x': 1397102460000,
          'y': 0.56
        },{
          'x': 1397139660000,
          'y': 0.4
        },{
          'x': 1397177400000,
          'y': 0.43
        },{
          'x': 1397228040000,
          'y': 0.33
        },{
          'x': 1397248260000,
          'y': 0.47
        },{
          'x': 1397291280000,
          'y': 0.41
        },{
          'x': 1397318100000,
          'y': 0.26
        },{
          'x': 1397342100000,
          'y': 0.42
        },{
          'x': 1397390820000,
          'y': 0.27
        },{
          'x': 1397408100000,
          'y': 0.38
        },{
          'x': 1397458800000,
          'y': 0.36
        },{
          'x': 1397522940000,
          'y': 0.32
        }
      ],
      inputType: 'code:JSON'
    },

    type: {
      type: String,
      defaultValue: 'line',
    }

  },

  listeners: {
    'px-demo-component-light-dom-loaded' : '_handleDemoLoaded'
  },

  /**
   * When the chart is loaded, try to call `notifyResize()` on it to ensure
   * that it resizes to the correct dimensions.
   */
  _handleDemoLoaded: function() {
    var chart = this.$$('px-vis-spark');
    if(chart && typeof chart.notifyResize === 'function') {
      // Wait 1000ms to make sure the parent is sized and ready for the redraw
      this.async(function(){
        chart.notifyResize();
      }, 1000);
    }
  }
});
