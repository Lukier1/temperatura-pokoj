angular.module('tempApp', [])
.controller('TempCurrentController', function ($scope) {
    var self = this;

    $scope.loading = true;
    $scope.temp = 12;
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB433wajWi0_24UTzjO-FVF6j-amyLu-rE",
        authDomain: "temperatuerpi.firebaseapp.com",
        databaseURL: "https://temperatuerpi.firebaseio.com",
        projectId: "temperatuerpi",
        storageBucket: "temperatuerpi.appspot.com",
        messagingSenderId: "216096447630"
    };
    var defaultApp = firebase.initializeApp(config);

    console.log(defaultApp.name);  // "[DEFAULT]"

    var database = firebase.database();

    var lastTemperatureRef = database.ref('last_temp');
    lastTemperatureRef.on('value', function (snapshot) {
        console.log($scope.temp);
        $scope.$apply(function () {
            $scope.loading = false;
            $scope.temp = snapshot.val().value;
            $scope.date = snapshot.val().date;
        });
    });

    firebase.auth().signInAnonymously().catch(function (error) {
            var errorCode = error.code;
            var errorMessage =error.message;
            console.log(errorCode);
            console.log(errorMessage);
        }
    );

    firebase.auth().onAuthStateChanged(function (user) {
        if(user) {
            console.log('Is anonymous: ' + user.isAnonymous);
            console.log('UID: ' + user.uid);
        }
        else
        {

        }
    });

});