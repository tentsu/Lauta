angular.module("Thread")
.factory('ThreadFactory', function($http) {
    function getThreads() {
        console.log("Loading messages...");

        // TODO: Fetch from DB
        $http.get("threads.json").success( function(data) {
            for (var i = 0; i < data.threads.length; i++) {
                var pituus = data.threads[i].answers.length;
                var temp = [];

                for (var j = 1; j <= 3; j++) {
                    temp[3 - j] = data.threads[i].answers[pituus - j];
                }
                data.threads[i].answers = temp;
                data.threads[i].answerCount = pituus;
            }
            console.log(data)
            return data;
        });
    }

    return {
        getThreads: getThreads
    }
});
