(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-login-login-module"],{

/***/ "./src/app/modules/login/authenticate/authenticate.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/modules/login/authenticate/authenticate.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvbG9naW4vYXV0aGVudGljYXRlL2F1dGhlbnRpY2F0ZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/modules/login/authenticate/authenticate.component.html":
/*!************************************************************************!*\
  !*** ./src/app/modules/login/authenticate/authenticate.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  Authenticating...\n</p>"

/***/ }),

/***/ "./src/app/modules/login/authenticate/authenticate.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/modules/login/authenticate/authenticate.component.ts ***!
  \**********************************************************************/
/*! exports provided: AuthenticateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticateComponent", function() { return AuthenticateComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/authentication/authentication.service */ "./src/app/services/authentication/authentication.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_error_error_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/error/error.service */ "./src/app/services/error/error.service.ts");





var AuthenticateComponent = /** @class */ (function () {
    function AuthenticateComponent(authService, errorService, route) {
        this.authService = authService;
        this.errorService = errorService;
        this.route = route;
    }
    AuthenticateComponent.prototype.ngOnInit = function () {
        var param = this.route.snapshot.queryParams;
        if (param && param.code) {
            this.authService.getAuthenticationCode(param.code);
        }
        else {
            this.errorService.logError('No parameter found when trying to fetch the authentication code from Spotify');
        }
    };
    AuthenticateComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-authenticate',
            template: __webpack_require__(/*! ./authenticate.component.html */ "./src/app/modules/login/authenticate/authenticate.component.html"),
            styles: [__webpack_require__(/*! ./authenticate.component.css */ "./src/app/modules/login/authenticate/authenticate.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"], src_app_services_error_error_service__WEBPACK_IMPORTED_MODULE_4__["ErrorService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], AuthenticateComponent);
    return AuthenticateComponent;
}());



/***/ }),

/***/ "./src/app/modules/login/login-routing.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/modules/login/login-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: LoginRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginRoutingModule", function() { return LoginRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/login.component */ "./src/app/modules/login/login/login.component.ts");
/* harmony import */ var _authenticate_authenticate_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./authenticate/authenticate.component */ "./src/app/modules/login/authenticate/authenticate.component.ts");





var routes = [
    {
        path: '',
        component: _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"]
    },
    {
        path: 'authenticate_me',
        component: _authenticate_authenticate_component__WEBPACK_IMPORTED_MODULE_4__["AuthenticateComponent"]
    }
];
var LoginRoutingModule = /** @class */ (function () {
    function LoginRoutingModule() {
    }
    LoginRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], LoginRoutingModule);
    return LoginRoutingModule;
}());



/***/ }),

/***/ "./src/app/modules/login/login.module.ts":
/*!***********************************************!*\
  !*** ./src/app/modules/login/login.module.ts ***!
  \***********************************************/
/*! exports provided: LoginModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login-routing.module */ "./src/app/modules/login/login-routing.module.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login/login.component */ "./src/app/modules/login/login/login.component.ts");
/* harmony import */ var _authenticate_authenticate_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./authenticate/authenticate.component */ "./src/app/modules/login/authenticate/authenticate.component.ts");






var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"], _authenticate_authenticate_component__WEBPACK_IMPORTED_MODULE_5__["AuthenticateComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _login_routing_module__WEBPACK_IMPORTED_MODULE_3__["LoginRoutingModule"]
            ]
        })
    ], LoginModule);
    return LoginModule;
}());



/***/ }),

/***/ "./src/app/modules/login/login/login.component.css":
/*!*********************************************************!*\
  !*** ./src/app/modules/login/login/login.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "button.mediaBtn {\n    width: auto;\n    height: auto; \n    font-size: 8em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9sb2dpbi9sb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksV0FBVztJQUNYLFlBQVk7SUFDWixjQUFjO0FBQ2xCIiwiZmlsZSI6InNyYy9hcHAvbW9kdWxlcy9sb2dpbi9sb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYnV0dG9uLm1lZGlhQnRuIHtcbiAgICB3aWR0aDogYXV0bztcbiAgICBoZWlnaHQ6IGF1dG87IFxuICAgIGZvbnQtc2l6ZTogOGVtO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/modules/login/login/login.component.html":
/*!**********************************************************!*\
  !*** ./src/app/modules/login/login/login.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"text-align: center;margin-top: 3em\">\n  <h1 style=\"font-size: 9em;\">Takt</h1>\n  <div>\n    <div class=\"container\" style=\"text-align: center; margin-top: 3em\">\n      <h1>Authenticate with Spotify™</h1>\n      <button type=\"button\" class=\"mediaBtn\" (click)=\"login()\">\n        <i class=\"fab fa-spotify\"></i>\n      </button>\n    </div>\n  </div>\n</div>\n<div class=\"container\" style=\"margin-top:4em; width:50%;\">\n\n</div>"

/***/ }),

/***/ "./src/app/modules/login/login/login.component.ts":
/*!********************************************************!*\
  !*** ./src/app/modules/login/login/login.component.ts ***!
  \********************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/authentication/authentication.service */ "./src/app/services/authentication/authentication.service.ts");
/* harmony import */ var src_app_services_error_error_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/error/error.service */ "./src/app/services/error/error.service.ts");




var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, errorService) {
        this.authService = authService;
        this.errorService = errorService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.authService.logout();
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.authService.getAuthenticationUrl().subscribe(function (url) { return window.open(url.toString(), '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes'); }, function (error) { return _this.errorService.logError(error); });
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/modules/login/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/modules/login/login/login.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"], src_app_services_error_error_service__WEBPACK_IMPORTED_MODULE_3__["ErrorService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ })

}]);
//# sourceMappingURL=modules-login-login-module.js.map