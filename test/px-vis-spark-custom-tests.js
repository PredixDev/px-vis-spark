/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

document.addEventListener("WebComponentsReady", function() {
  runCustomTests();
});

function runCustomTests() {
  suite('Custom Automation Tests for px-vis-spark (line)', function() {
    var sparkFixture;

    suiteSetup(function(done) {
      sparkFixture = document.getElementById('px_vis_spark_1');

      var rendered = function() {
        sparkFixture.removeEventListener('px-vis-line-svg-rendering-ended', rendered);
        done();
      };
      sparkFixture.addEventListener('px-vis-line-svg-rendering-ended', rendered);
    });

    test('Spark line sparkFixture is created', function() {
      assert.isTrue(document.getElementById('px_vis_spark_1') !== null);
    });
    test('Spark line default height is 50', function() {
      assert.equal(getComputedStyle(sparkFixture.svg.node().ownerSVGElement).height,"50px");
    });
    test('Spark line default width is 300', function() {
      assert.equal(getComputedStyle(sparkFixture.svg.node().ownerSVGElement).width,"300px");
    });

    test('Spark line is created', function() {
      var path = sparkFixture.svg.select('path.series-line'),
          d = path.attr('d').split(' ').join('').split(',').join('');

      assert.equal('M00L30050', d);
    });

    test('Spark area is created', function() {
      var path = sparkFixture.svg.select('path.series-area'),
          d = path.attr('d').split(' ').join('').split(',').join('');

      assert.equal('M00L30050L300174L0174Z', d);
    });

    test('gradient is created', function() {
      var grad = sparkFixture.svg.select('linearGradient'),
          stops = grad.selectAll('stop').nodes();

      assert.equal(Px.d3.select(stops[0]).attr('offset'), '0%');
      assert.equal(Px.d3.select(stops[1]).attr('offset'), '70%');
      assert.equal(Px.d3.select(stops[2]).attr('offset'), '0%');

      assert.equal(Px.d3.select(stops[0]).attr('stop-opacity'), '0.15');
      assert.equal(Px.d3.select(stops[1]).attr('stop-opacity'), '0.05');
      assert.equal(Px.d3.select(stops[2]).attr('stop-opacity'), '0.15');
    });
  });

  suite('px-vis-spark (line) updates with negative values', function() {
    var sparkFixture;

    suiteSetup(function(done) {
      sparkFixture = document.getElementById('px_vis_spark_1');

      var rendered = function() {
        sparkFixture.removeEventListener('px-vis-line-svg-rendering-ended', rendered);
        done();
      };
      sparkFixture.addEventListener('px-vis-line-svg-rendering-ended', rendered);

      sparkFixture.set('data', [{"x": 1397102460000,"y": 0.56},{"x": 1397139660000,"y": 0.4}, {"x": 1397176860000,"y": -0.56},{"x": 1397214060000,"y": -0.4}]);
    });

    test('Spark line is created', function() {
      var path = sparkFixture.svg.select('path.series-line'),
          d = path.attr('d').split(' ').join('').split(',').join('');

      assert.equal('M00L30050L600349L900299', d);
    });

    test('Spark area is created', function() {
      var path = sparkFixture.svg.select('path.series-area'),
          d = path.attr('d').split(' ').join('').split(',').join('');

      assert.equal('M00L30050L600349L900299L900174L600174L300174L0174Z', d);
    });

    test('gradient is updated', function() {
      var grad = sparkFixture.svg.select('linearGradient'),
          stops = grad.selectAll('stop').nodes();

      assert.equal(Px.d3.select(stops[0]).attr('offset'), '0%');
      assert.equal(Px.d3.select(stops[1]).attr('offset'), '50%');
      assert.equal(Px.d3.select(stops[2]).attr('offset'), '100%');

      assert.equal(Px.d3.select(stops[0]).attr('stop-opacity'), '0.15');
      assert.equal(Px.d3.select(stops[1]).attr('stop-opacity'), '0.05');
      assert.equal(Px.d3.select(stops[2]).attr('stop-opacity'), '0.15');
    });
  });

  suite('Custom Automation Tests for px-vis-spark (bar)', function() {
    var sparkFixture;

    suiteSetup(function(done) {
      setTimeout(function() {
        sparkFixture = document.getElementById('px_vis_spark_2');
        done();
      },1000);
    });

    test('Spark bar sparkFixture exists', function() {
      var rect = sparkFixture.shadowRoot ? sparkFixture.shadowRoot.querySelector('px-simple-win-loss-chart').shadowRoot.querySelector('rect') : sparkFixture.querySelector('rect');

      assert.equal(getComputedStyle(rect).visibility,"visible");
    });

    test('Spark bar discrete height is 150', function() {
      var svg = sparkFixture.shadowRoot ? sparkFixture.shadowRoot.querySelector('px-simple-win-loss-chart').shadowRoot.querySelector('svg') : sparkFixture.querySelector('svg');

      assert.equal(getComputedStyle(svg).height,"150px");
    });
    test('Spark bar discrete width is 250', function() {
      var svg = sparkFixture.shadowRoot ? sparkFixture.shadowRoot.querySelector('px-simple-win-loss-chart').shadowRoot.querySelector('svg') : sparkFixture.querySelector('svg');

      assert.equal(getComputedStyle(svg).width,"250px");
    });
    test('Spark bar count of rectangles in chart equals the data array', function() {
      var svg = sparkFixture.shadowRoot ? sparkFixture.shadowRoot.querySelector('px-simple-win-loss-chart').shadowRoot.querySelector('svg') : sparkFixture.querySelector('svg');
      var rect = svg.querySelectorAll('rect');

      assert.equal(rect.length,"3");
    });
  });

  suite('Custom Automation Tests for px-vis-spark (bar)', function() {
    var sparkFixture;
    suiteSetup(function(done) {
      setTimeout(function(){
        sparkFixture = document.getElementById('px_vis_spark_3');
        done();
      },1000);
    });

    test('Spark win/loss sparkFixture exists', function() {
      var rect = sparkFixture.shadowRoot ? sparkFixture.shadowRoot.querySelector('px-simple-win-loss-chart').shadowRoot.querySelector('rect') : sparkFixture.querySelector('rect');

      assert.equal(getComputedStyle(rect).visibility,"visible");
    });

    test('Spark win/loss count of rectangles in chart equals the data array', function() {
      var svg = sparkFixture.shadowRoot ? sparkFixture.shadowRoot.querySelector('px-simple-win-loss-chart').shadowRoot.querySelector('svg') : sparkFixture.querySelector('svg');

      assert.equal(svg.querySelectorAll('rect').length,"3");
    });
  });

}
