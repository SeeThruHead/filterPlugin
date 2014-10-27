$(function() {
  var fakeArray = [];
  for (i=0; i < 5000; i++) {
    fakeArray.push(faker.name.findName());
  }
  console.log(fakeArray);
  $('.tester').createFilter(fakeArray);
});