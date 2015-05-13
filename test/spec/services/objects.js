'use strict';

describe('Service: Objects', function () {

  // load the service's module
  beforeEach(module('myGagApp'));

  // instantiate service
  var Objects;
  beforeEach(inject(function (_Objects_) {
    Objects = _Objects_;
  }));

  it('should do something', function () {
    expect(!!Objects).toBe(true);
  });

});
