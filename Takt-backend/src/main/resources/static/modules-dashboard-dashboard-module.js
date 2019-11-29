(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-dashboard-dashboard-module"],{

/***/ "./src/app/modules/dashboard/dashboard-routing.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/modules/dashboard/dashboard-routing.module.ts ***!
  \***************************************************************/
/*! exports provided: DashboardRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardRoutingModule", function() { return DashboardRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/modules/dashboard/dashboard/dashboard.component.ts");




var routes = [
    {
        path: '',
        component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__["DashboardComponent"]
    }
];
var DashboardRoutingModule = /** @class */ (function () {
    function DashboardRoutingModule() {
    }
    DashboardRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], DashboardRoutingModule);
    return DashboardRoutingModule;
}());



/***/ }),

/***/ "./src/app/modules/dashboard/dashboard.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/modules/dashboard/dashboard.module.ts ***!
  \*******************************************************/
/*! exports provided: DashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard-routing.module */ "./src/app/modules/dashboard/dashboard-routing.module.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/modules/dashboard/dashboard/dashboard.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");






var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_4__["DashboardComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_3__["DashboardRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
            ]
        })
    ], DashboardModule);
    return DashboardModule;
}());



/***/ }),

/***/ "./src/app/modules/dashboard/dashboard/dashboard.component.css":
/*!*********************************************************************!*\
  !*** ./src/app/modules/dashboard/dashboard/dashboard.component.css ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".banner {\n    height: 5em;\n    text-align: center;\n    color: white;\n}\n\nbutton.mediaBtn-filled {\n    width: 38em;\n    height: 5em;\n}\n\n.mediaBtn-search {\n    width: 14rem;\n    height: 5em;\n}\n\nbutton.mediaBtn-outline {\n    width: 12em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9kYXNoYm9hcmQvZGFzaGJvYXJkL2Rhc2hib2FyZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksV0FBVztJQUNYLGtCQUFrQjtJQUNsQixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksV0FBVztJQUNYLFdBQVc7QUFDZjs7QUFFQTtJQUNJLFlBQVk7SUFDWixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxXQUFXO0FBQ2YiLCJmaWxlIjoic3JjL2FwcC9tb2R1bGVzL2Rhc2hib2FyZC9kYXNoYm9hcmQvZGFzaGJvYXJkLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYmFubmVyIHtcbiAgICBoZWlnaHQ6IDVlbTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6IHdoaXRlO1xufVxuXG5idXR0b24ubWVkaWFCdG4tZmlsbGVkIHtcbiAgICB3aWR0aDogMzhlbTtcbiAgICBoZWlnaHQ6IDVlbTtcbn1cblxuLm1lZGlhQnRuLXNlYXJjaCB7XG4gICAgd2lkdGg6IDE0cmVtO1xuICAgIGhlaWdodDogNWVtO1xufVxuXG5idXR0b24ubWVkaWFCdG4tb3V0bGluZSB7XG4gICAgd2lkdGg6IDEyZW07XG59Il19 */"

/***/ }),

/***/ "./src/app/modules/dashboard/dashboard/dashboard.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/modules/dashboard/dashboard/dashboard.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <nav class=\"navbar fixed-top banner\">\n    <button class=\"mediaBtn\" type=\"button\" (click)=\"logout()\">Logout</button>\n    <div>\n      <h1>Takt</h1>\n    </div>\n    <div>\n      <i class=\"far fa-user-circle\"></i>\n      {{displayName}}\n    </div>\n  </nav>\n</div>\n\n<div class=\"container align-self-center\" style=\"width: 40rem; margin-bottom: 20px; margin-top: 180px\">\n  <form [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n    <button type=\"button\" class=\"mediaBtn-filled\" (click)='createRoom()'>Create new Room</button>\n    <br>\n    <br>\n    <div class=\"input-group mb-3\">\n      <input type=\"text\" class=\"form-control mediaBtn-search\" placeholder=\"Enter active room code\"\n        formControlName=\"roomId\">\n      <div class=\"input-group-append\">\n        <button class=\"mediaBtn-outline\" type=\"button\" (click)=\"submit()\">Join</button>\n      </div>\n    </div>\n  </form>\n</div>"

/***/ }),

/***/ "./src/app/modules/dashboard/dashboard/dashboard.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/modules/dashboard/dashboard/dashboard.component.ts ***!
  \********************************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var src_app_services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/authentication/authentication.service */ "./src/app/services/authentication/authentication.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_error_error_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/error/error.service */ "./src/app/services/error/error.service.ts");
/* harmony import */ var src_app_services_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/websocket/websocket.service */ "./src/app/services/websocket/websocket.service.ts");








var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(fb, userService, authService, socketService, errorService, router) {
        var _this = this;
        this.fb = fb;
        this.userService = userService;
        this.authService = authService;
        this.socketService = socketService;
        this.errorService = errorService;
        this.router = router;
        this.userService.getUserDisplayName().subscribe(function (msg) { return _this.displayName = msg.response; });
        this.socketService.connectToWebsocket();
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            roomId: [, []]
        });
    };
    DashboardComponent.prototype.submit = function () {
        var roomId = this.roomId.substring(this.roomId.indexOf('/room'));
        try {
            this.router.navigateByUrl(roomId);
        }
        catch (exception) {
            this.errorService.logError(exception);
        }
    };
    DashboardComponent.prototype.createRoom = function () {
        var _this = this;
        var roomId = '';
        this.userService.createRoom().subscribe(function (msg) { return roomId = msg.response; }, function (error) { return _this.errorService.logError(error); }, function () {
            try {
                _this.router.navigate(['/room/' + roomId]);
            }
            catch (exception) {
                _this.errorService.logError(exception);
            }
        });
    };
    DashboardComponent.prototype.logout = function () {
        this.socketService.disconnect();
        this.authService.logout();
    };
    Object.defineProperty(DashboardComponent.prototype, "roomId", {
        get: function () {
            return this.form.get('roomId').value;
        },
        enumerable: true,
        configurable: true
    });
    DashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/modules/dashboard/dashboard/dashboard.component.html"),
            styles: [__webpack_require__(/*! ./dashboard.component.css */ "./src/app/modules/dashboard/dashboard/dashboard.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"], src_app_services_authentication_authentication_service__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"],
            src_app_services_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_7__["WebsocketService"], src_app_services_error_error_service__WEBPACK_IMPORTED_MODULE_6__["ErrorService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ })

}]);
//# sourceMappingURL=modules-dashboard-dashboard-module.js.map