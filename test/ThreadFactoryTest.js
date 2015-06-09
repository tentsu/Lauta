describe('ThreadFactory', function () {
	var service;

	var successPost = {
		title: 'Test',
		message: 'This is a test message',
		img: 'test.png'
	};

	beforeEach(module('Board'));

	beforeEach(inject(function (_ThreadFactory_) {
		service = _ThreadFactory_;
	}));

	// it('Should find function in service', function () {
	// 	expect(angular.isFunction(service.getThreads())).toBe(true);
	// });

	it('Should be able to validate post', function () {
		var validation = service.validatePost(successPost);
		expect(validation).toBe(true);
	});
});