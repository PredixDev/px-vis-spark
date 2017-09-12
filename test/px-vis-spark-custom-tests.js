// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  // Place any setup steps like variable declaration and initialization here

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('Custom Automation Tests for px-vis-spark (line)', function() {
    var fixture = document.getElementById('px_vis_spark_1');

    suiteSetup(function(done) {
      var rendered = function() {
        fixture.removeEventListener('px-vis-line-svg-rendering-ended', rendered);
        done();
      };
      fixture.addEventListener('px-vis-line-svg-rendering-ended', rendered);
    });

    test('Spark line fixture is created', function() {
      assert.isTrue(document.getElementById('px_vis_spark_1') !== null);
    });
    test('Spark line default height is 50', function() {
      assert.equal(getComputedStyle(fixture.querySelector('svg')).height,"50px");
    });
    test('Spark line default width is 300', function() {
      assert.equal(getComputedStyle(fixture.querySelector('svg')).width,"300px");
    });

    test('Spark line is created', function() {
      var path = fixture.svg.select('path.series-line'),
          d = path.attr('d').split(' ').join('').split(',').join('');

      assert.equal('M00L30050', d);
    });

    test('Spark area is created', function() {
      var path = fixture.svg.select('path.series-area'),
          d = path.attr('d').split(' ').join('').split(',').join('');

      assert.equal('M00L30050L300174L0174Z', d);
    });

    test('gradient is created', function() {
      var grad = fixture.svg.select('linearGradient'),
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
    var fixture = document.getElementById('px_vis_spark_1');

    suiteSetup(function(done) {
      var rendered = function() {
        fixture.removeEventListener('px-vis-line-svg-rendering-ended', rendered);
        done();
      };
      fixture.addEventListener('px-vis-line-svg-rendering-ended', rendered);

      fixture.set('data', [{"x": 1397102460000,"y": 0.56},{"x": 1397139660000,"y": 0.4}, {"x": 1397176860000,"y": -0.56},{"x": 1397214060000,"y": -0.4}]);
    });

    test('Spark line is created', function() {
      var path = fixture.svg.select('path.series-line'),
          d = path.attr('d').split(' ').join('').split(',').join('');

      assert.equal('M00L30050L600349L900299', d);
    });

    test('Spark area is created', function() {
      var path = fixture.svg.select('path.series-area'),
          d = path.attr('d').split(' ').join('').split(',').join('');

      assert.equal('M00L30050L600349L900299L900174L600174L300174L0174Z', d);
    });

    test('gradient is updated', function() {
      var grad = fixture.svg.select('linearGradient'),
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
    test('Spark bar fixture exists', function(done) {
      assert.isTrue(document.getElementById('px_vis_spark_2') !== null);
      setTimeout(function(){
       assert.equal(getComputedStyle(document.querySelector('rect')).visibility,"visible");
       done();
      },1000);
    });
    var fixture = document.getElementById('px_vis_spark_2');
    // test('Spark bar discrete height is 40', function(done) {
    //   assert.equal(getComputedStyle(fixture.querySelector('svg')).height,"40px");
    //   done();
    // });
    test('Spark bar discrete height is 150', function(done) {
      assert.equal(getComputedStyle(fixture.querySelector('svg')).height,"150px");
      done();
    });
    test('Spark bar discrete width is 250', function(done) {
      assert.equal(getComputedStyle(fixture.querySelector('svg')).width,"250px");
      done();
    });
    test('Spark bar count of rectangles in chart equals the data array', function(done) {
      var svg = fixture.querySelector('svg');
      assert.equal(svg.querySelectorAll('rect').length,"3");
      done();
    });
  });

  suite('Custom Automation Tests for px-vis-spark (bar)', function() {
    test('Spark win/loss fixture exists', function(done) {
      assert.isTrue(document.getElementById('px_vis_spark_3') !== null);
      setTimeout(function(){
       assert.equal(getComputedStyle(document.querySelector('rect')).visibility,"visible");
       done();
      },2000);
    });
    var fixture = document.getElementById('px_vis_spark_3');
    // TODO: Known issue with chart resize behavior. Need to follow up with Vis team.
    // test('Spark win/loss test for resize chart by height', function(done) {
    //   document.getElementById('fixture_dimensions').style.height = '56px';
    //   window.dispatchEvent(new Event('resize'));
    //   setTimeout(function(){
    //     assert.equal(getComputedStyle(fixture.querySelector('svg')).height,"56px");
    //     done();
    //   },1000);
    // });
    // test('Spark win/loss test for resize chart by width', function(done) {
    //   document.getElementById('fixture_dimensions').style.width = '300px';
    //   window.dispatchEvent(new Event('resize'));
    //   setTimeout(function(){
    //     assert.equal(getComputedStyle(fixture.querySelector('svg')).width,"300px");
    //     done();
    //   },1000);
    // });
    test('Spark win/loss count of rectangles in chart equals the data array', function(done) {
      var svg = fixture.querySelector('svg');
      assert.equal(svg.querySelectorAll('rect').length,"3");
      done();
    });
  });

}
