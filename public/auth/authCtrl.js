(function(){
    var auth = angular.module('myApp.auth', ['ngResource', 'ngRoute']);

    var usersUrl = "http://localhost:2403/users/";

    auth.constant('usersUrl', usersUrl);
    auth.controller('AuthController', function($scope, $http, $resource, $location, usersUrl) {
        var self = this;

        self.User={};

       $scope.usersResource = $resource(usersUrl + ":id", {id: "@id"});

       $scope.users = $scope.usersResource.query(); // get all users with query() method from ngResource

        $scope.usersArr = $resource(usersUrl, null, {
            query: {
                method: 'GET',
                isArray: false,
                transformResponse: function(data) {
                    return angular.fromJson(data).items;
                }
            }
        });
        self.getUserPage = function(){

            console.log($scope.usersArr );

            // if($scope.user.get({id: User.id})){
            //     $location.path("/page");
            // }
        }





        self.Users = [{}];
        self.minlength = 7;

        self.isError = function (name, userDetails, isvalid) {
            if (name == 'loginForm') {
                if (!isvalid) {
                    self.showError = true;
                    console.log('Something gone wrong');
                }
                else {
                    self.Users.push(userDetails);
                    //console.log(self.Users);
                    //console.log(self.currentUser);
                }
                ;
            } else {
                if (!isvalid) {
                    self.showError = true;
                    console.log('Hello');
                }
            }
        };

        self.getAdminPage = function () {
            //console.log(currentUser);
        }

        self.getError = function (error) {
            if (angular.isDefined(error)) {
                if (error.required) {
                    return "Поле не должно быть пустым";
                } else if (error.email) {
                    return "Введите правильно email";
                } else if (error.pattern && error.minlength) {
                    return "Пароль должен содержать цифры, прописные и заглавные буквы." + "Пароль должен содержать минимум 7 символов"
                } else if (error.minlength) {
                    return "Пароль должен содержать минимум 7 символов"
                } else if (error.pattern) {
                    return "Пароль должен содержать цифры, прописные и заглавные буквы"
                }
            }
            ;
        };

    });

    //auth.controller('AuthController', [AuthControlller]);

    auth.controller('loginCtrl', function ($scope) {});
    auth.controller('registerCtrl', function ($scope) {});

})();










