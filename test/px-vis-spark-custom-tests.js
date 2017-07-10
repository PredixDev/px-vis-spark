// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  // Place any setup steps like variable declaration and initialization here

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('Custom Automation Tests for px-vis-spark (line)', function() {
    test('Spark line fixture is created', function() {
      assert.isTrue(document.getElementById('px_vis_spark_1') !== null);
    });
    var fixture = document.getElementById('px_vis_spark_1');
    test('Spark line default height is 50', function(done) {
      assert.equal(getComputedStyle(fixture.querySelector('svg')).height,"50px");
      done();
    });
    test('Spark line default width is 300', function(done) {
      assert.equal(getComputedStyle(fixture.querySelector('svg')).width,"300px");
      done();
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
