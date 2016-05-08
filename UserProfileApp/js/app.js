var userProfileApp = angular.module('userProfileApp', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/users');

        var users = {
            name: 'users',
            url: '/users',
            templateUrl: 'views/user-list.html',
            controller: 'UserController'
        };

        var adduser = {
            name: 'adduser',
            url: '/adduser',
            templateUrl: 'views/add-user.html',
            controller: 'UserController'
        };

        var viewuser = {
            name: 'viewuser',
            url: '/viewuser',
            templateUrl: 'views/view-user.html',
            controller: 'UserController'
        };

        $stateProvider
            .state(users)
            .state(adduser)
            .state(viewuser);
    });

userProfileApp.factory('UserService', function ($http) {
    var UserService = {
        selectedUser: {},
        getAllUsers: function () {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get('http://mocker.egen.io/users').then(function (response) {
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return promise;
        },
        getUser: function (id) {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get('http://mocker.egen.io/users/' + id).then(function (response) {
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return promise;
        },
        addUser: function (user) {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.post('http://mocker.egen.io/users/', user).then(function (response) {
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return promise;

        },
        deleteUser: function (id) {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.delete('http://mocker.egen.io/users/' + id).then(function (response) {
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return promise;
        }
    };
    return UserService;
});

userProfileApp.controller('UserController', function ($scope, UserService, $location) {
    $scope.Users = [];
    $scope.isDrawerOpen = false;
    $scope.SelectedUser = UserService.selectedUser;

    $scope.getAllUsers = function () {
        UserService.getAllUsers().then(function (data) {
            console.log(data);
            $scope.Users = data;
        });
    };

    $scope.getUser = function (id) {
        UserService.getUser(id).then(function (data) {
            console.log(data);
            UserService.selectedUser = data;
            $location.path('/viewuser');
        });
    };

    $scope.addUser = function (user) {
        UserService.addUser(user).then(function (data) {
            console.log(data);
            $location.path('/users');
        });
    };

    $scope.deleteUser = function (id) {
        UserService.deleteUser(id).then(function (data) {
            console.log(data);
            $location.path('/users');
        });
    };

    $scope.getFullName = function (user) {
        return user.lastName + ' ' + user.firstName;
    };

    $scope.getAddress = function (address) {
        return ((address.street) ? address.street : '') + ', ' +
            ((address.city) ? address.city : '') + ', ' +
            ((address.state) ? address.state : '') + ', ' +
            ((address.country) ? address.country : '') + ', ' +
            ((address.zip) ? address.zip : '');
    };

    $scope.openDrawer = function (event) {
        $scope.isDrawerOpen = true;
    };

    $scope.closeDrawer = function () {
        $scope.isDrawerOpen = false;
    };
});