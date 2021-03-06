/*
 * @name ThreadCtrl
 * @desc Controller to show opened thread.
 */
(function () {
	'use strict';

	angular.module('Thread').controller('ThreadCtrl', ThreadCtrl);

	ThreadCtrl.$inject = ['$scope', '$interval', '$location', '$routeParams', 'ThreadFactory', 'alerts'];

	function ThreadCtrl($scope, $interval, $location, $routeParams, ThreadFactory, alerts) {
		// Init thread so React is happy
		$scope.thread = {};

		// Get thread info and posts
		ThreadFactory.getThread($routeParams.threadId).then(function (data) {
			$scope.thread = data;
		});

		// Start function to fetch new answers every X milliseconds
		var intervalli = $interval(getNewAnswers, 10000);

		// Stop interval when page is changed
		$scope.$on('$destroy', function () {
			$interval.cancel(intervalli);
		});


		/*
		 * @name addAnswer
		 * @desc Calls factory to add given post to database
		 */
		$scope.addAnswer = function (post, clearForm) {
			ThreadFactory.addPost(post).then(function (data) {
				getNewAnswers();
				clearForm();

				alerts.addAlert('success', 'Answer added.');
			}, function () {
				console.log('ERROR');
			});
		};


		/*
		 * @name deletePost
		 * @desc Calls factory to delete given post from database
		 */
		$scope.deletePost = function (threadId, postId) {
			ThreadFactory.deletePost(threadId, postId).then(function (result) {
				alerts.addAlert('success', 'Post deleted.');

				if (result.threadId) {
					ThreadFactory.getThread(result.threadId).then(function (data) {
						$scope.thread = data;
					});
				} else {
					$location.url('/');
				}
			}, function () {
				console.log('ERROR');
			});
		};


		/*
		 * @name getNewAnswers
		 * @desc Calls factory to get all answers on given thread that have come after timestamp
		 */
		function getNewAnswers() {
			var specs = {
				id: $scope.thread.id,
				time: ($scope.thread.answers.length > 0) ? new Date($scope.thread.answers[$scope.thread.answers.length - 1].time) : new Date($scope.thread.time)
			};

			ThreadFactory.getNewAnswers(specs).then(function (data) {
				$scope.thread.answers = ($scope.thread.answers).concat(data);
				$scope.thread.answerCount = $scope.thread.answers.length;
			});
		}


		$scope.asd = function () {
			$scope.derp = 'herp';
		};
	}

})();