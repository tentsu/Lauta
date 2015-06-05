describe('ThreadCtrl', function () {
	var controller, scope;

	beforeEach(module('Board'));

	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		controller = $controller('ThreadCtrl', {
			$scope: scope
		});
	}));

	it('derp to be herp', function () {
		scope.asd();
		expect(scope.derp).toBe('herp');
	});
});