function createFakeData(amount) {
  var result = [];
  for (i=0; i < amount; i++)result.push(faker.name.findName());
  return result;
};

var fakeArray = createFakeData(9999);