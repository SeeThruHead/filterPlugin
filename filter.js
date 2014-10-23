(function ($) {
  $.fn.createFilter = function(options) {
    return this;
  };

}(jQuery));

$(function() {
  function createFakeData(amount) {
    var result = [];
    for (i=0; i < amount; i++)result.push(faker.name.findName());
    return result;
  };
  var fakeArray = createFakeData(10);
  console.table(fakeArray);
});
