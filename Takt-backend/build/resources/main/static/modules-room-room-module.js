(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["modules-room-room-module"],{

/***/ "./src/app/modules/room/navbar/navbar.component.css":
/*!**********************************************************!*\
  !*** ./src/app/modules/room/navbar/navbar.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvcm9vbS9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/modules/room/navbar/navbar.component.html":
/*!***********************************************************!*\
  !*** ./src/app/modules/room/navbar/navbar.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar fixed-top banner\" style=\"text-align: center;\">\n  <button class=\"mediaBtn\" type=\"button\" (click)=\"goToDashboard()\">Dashboard</button>\n  <div class=\"\">\n    <h1 style=\"color: white; float: left;\">Room {{roomId}}</h1>\n    <button class=\"mediaBtn-filled\" type=\"button\" style=\"margin-left: 10px; margin-top: 6px; padding: 0.5em; float:right\" (click)=\"copyToClipboard()\">\n      Copy code</button>\n  </div>\n  <div>\n    <i class=\"far fa-user-circle\"></i>\n    {{displayName}}\n  </div>\n</nav>"

/***/ }),

/***/ "./src/app/modules/room/navbar/navbar.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/modules/room/navbar/navbar.component.ts ***!
  \*********************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/websocket/websocket.service */ "./src/app/services/websocket/websocket.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(socketService, router) {
        this.socketService = socketService;
        this.router = router;
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.copyToClipboard = function () {
        var _this = this;
        document.addEventListener('copy', function (e) {
            e.clipboardData.setData('text/plain', ('https://takt-application.herokuapp.com' + _this.router.url));
            e.preventDefault();
            document.removeEventListener('copy', null);
        });
        document.execCommand('copy');
    };
    NavbarComponent.prototype.goToDashboard = function () {
        this.router.navigate(['/dashboard']);
        this.socketService.unsubscribeToRoom();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], NavbarComponent.prototype, "roomId", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], NavbarComponent.prototype, "displayName", void 0);
    NavbarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! ./navbar.component.html */ "./src/app/modules/room/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.css */ "./src/app/modules/room/navbar/navbar.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_2__["WebsocketService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/modules/room/player/player.component.css":
/*!**********************************************************!*\
  !*** ./src/app/modules/room/player/player.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".player {\n    text-align: center;\n}\n\n.player-section {\n    text-align: center;\n    margin-top: 1%;\n    margin-bottom: 1%;\n}\n\n.player-section.left {\n    border-left: 1px solid #1DB954;\n}\n\n.player-section.left:hover .warningtext {\n    visibility: visible;\n    opacity: 1;\n}\n\nspan.warningtext {\n    visibility: hidden;\n    font-size: 12px;\n    width: 200px;\n    background-color: #9d0202;\n    border-radius: 20%;\n    color: white;\n    text-align: center;\n    padding: 5px 0;\n    border-radius: 6px;\n    position: absolute;\n    z-index: 1;\n    bottom: 120%;\n    left: 50%;\n    margin-left: -110px;\n    opacity: 0;\n    -webkit-transition: opacity 0.3s;\n    transition: opacity 0.3s;\n}\n\nbutton.mediaBtn.reversed {\n    background-color: transparent;\n    color: #1DB954;\n    -webkit-transition: color 0.15s ease-in-out;\n    transition: color 0.15s ease-in-out;\n    outline: none;\n    border: none;\n}\n\nbutton.mediaBtn.reversed:hover {\n    color: white;\n}\n\nbutton.mediaBtn.reversed:active {\n    color: rgb(119, 234, 159);\n}\n\n.slidecontainer {\n    margin-left: auto;\n    margin-right: auto;\n    width: 80%;\n    text-align: center;\n    font-size: 13px;\n}\n\n.slider {\n    vertical-align: 3px;\n    -webkit-appearance: none;\n    width: 75%;\n    height: 2px;\n    border-radius: 5px;\n    background: white;\n    outline: none;\n    opacity: 1;\n    -webkit-transition: .2s;\n    -webkit-transition: opacity .2s;\n    transition: opacity .2s;\n}\n\n.slider::-webkit-slider-thumb {\n    transition: all .12s ease;\n    -webkit-transition: all .12s ease;\n    -webkit-appearance: none;\n    appearance: none;\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background: #aeaeae;\n}\n\n.slider::-moz-range-thumb {\n    -moz-appearance: none;\n         appearance: none;\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    background: #aeaeae;\n}\n\n.active-slider::-webkit-slider-thumb {\n    background: #1DB954;\n    -webkit-transform: scale(1.4);\n            transform: scale(1.4);\n}\n\n.active-slider::-moz-range-thumb {\n    background-color: #1DB954;\n    transform: scale(1.4);\n}\n\n.option {\n    background-color: transparent;\n    border-radius: 0px;\n    border: none;\n    outline: none;\n    color: white;\n}\n\n.option:hover {\n    color: #1DB954;\n}\n\n.option:active {\n    color: #1DB954;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9yb29tL3BsYXllci9wbGF5ZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixjQUFjO0lBQ2QsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLFVBQVU7QUFDZDs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsWUFBWTtJQUNaLHlCQUF5QjtJQUN6QixrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLGtCQUFrQjtJQUNsQixjQUFjO0lBQ2Qsa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsWUFBWTtJQUNaLFNBQVM7SUFDVCxtQkFBbUI7SUFDbkIsVUFBVTtJQUNWLGdDQUF3QjtJQUF4Qix3QkFBd0I7QUFDNUI7O0FBRUE7SUFDSSw2QkFBNkI7SUFDN0IsY0FBYztJQUNkLDJDQUFtQztJQUFuQyxtQ0FBbUM7SUFDbkMsYUFBYTtJQUNiLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0kseUJBQXlCO0FBQzdCOztBQUVBO0lBQ0ksaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1Ysa0JBQWtCO0lBQ2xCLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsd0JBQXdCO0lBQ3hCLFVBQVU7SUFDVixXQUFXO0lBQ1gsa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQixhQUFhO0lBQ2IsVUFBVTtJQUNWLHVCQUF1QjtJQUN2QiwrQkFBdUI7SUFBdkIsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLGlDQUFpQztJQUNqQyx3QkFBd0I7SUFDeEIsZ0JBQWdCO0lBQ2hCLFdBQVc7SUFDWCxZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLHFCQUFnQjtTQUFoQixnQkFBZ0I7SUFDaEIsV0FBVztJQUNYLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLDZCQUFxQjtZQUFyQixxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksNkJBQTZCO0lBQzdCLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osYUFBYTtJQUNiLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksY0FBYztBQUNsQiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvcm9vbS9wbGF5ZXIvcGxheWVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucGxheWVyIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5wbGF5ZXItc2VjdGlvbiB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIG1hcmdpbi10b3A6IDElO1xuICAgIG1hcmdpbi1ib3R0b206IDElO1xufVxuXG4ucGxheWVyLXNlY3Rpb24ubGVmdCB7XG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjMURCOTU0O1xufVxuXG4ucGxheWVyLXNlY3Rpb24ubGVmdDpob3ZlciAud2FybmluZ3RleHQge1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gICAgb3BhY2l0eTogMTtcbn1cblxuc3Bhbi53YXJuaW5ndGV4dCB7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICB3aWR0aDogMjAwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzlkMDIwMjtcbiAgICBib3JkZXItcmFkaXVzOiAyMCU7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBwYWRkaW5nOiA1cHggMDtcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHotaW5kZXg6IDE7XG4gICAgYm90dG9tOiAxMjAlO1xuICAgIGxlZnQ6IDUwJTtcbiAgICBtYXJnaW4tbGVmdDogLTExMHB4O1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzO1xufVxuXG5idXR0b24ubWVkaWFCdG4ucmV2ZXJzZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGNvbG9yOiAjMURCOTU0O1xuICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2UtaW4tb3V0O1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgYm9yZGVyOiBub25lO1xufVxuXG5idXR0b24ubWVkaWFCdG4ucmV2ZXJzZWQ6aG92ZXIge1xuICAgIGNvbG9yOiB3aGl0ZTtcbn1cblxuYnV0dG9uLm1lZGlhQnRuLnJldmVyc2VkOmFjdGl2ZSB7XG4gICAgY29sb3I6IHJnYigxMTksIDIzNCwgMTU5KTtcbn1cblxuLnNsaWRlY29udGFpbmVyIHtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgd2lkdGg6IDgwJTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1zaXplOiAxM3B4O1xufVxuXG4uc2xpZGVyIHtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogM3B4O1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICB3aWR0aDogNzUlO1xuICAgIGhlaWdodDogMnB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICBvdXRsaW5lOiBub25lO1xuICAgIG9wYWNpdHk6IDE7XG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiAuMnM7XG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAuMnM7XG59XG5cbi5zbGlkZXI6Oi13ZWJraXQtc2xpZGVyLXRodW1iIHtcbiAgICB0cmFuc2l0aW9uOiBhbGwgLjEycyBlYXNlO1xuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIC4xMnMgZWFzZTtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgYXBwZWFyYW5jZTogbm9uZTtcbiAgICB3aWR0aDogMTBweDtcbiAgICBoZWlnaHQ6IDEwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJhY2tncm91bmQ6ICNhZWFlYWU7XG59XG5cbi5zbGlkZXI6Oi1tb3otcmFuZ2UtdGh1bWIge1xuICAgIGFwcGVhcmFuY2U6IG5vbmU7XG4gICAgd2lkdGg6IDEwcHg7XG4gICAgaGVpZ2h0OiAxMHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBiYWNrZ3JvdW5kOiAjYWVhZWFlO1xufVxuXG4uYWN0aXZlLXNsaWRlcjo6LXdlYmtpdC1zbGlkZXItdGh1bWIge1xuICAgIGJhY2tncm91bmQ6ICMxREI5NTQ7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xufVxuXG4uYWN0aXZlLXNsaWRlcjo6LW1vei1yYW5nZS10aHVtYiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzFEQjk1NDtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuNCk7XG59XG5cbi5vcHRpb24ge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlci1yYWRpdXM6IDBweDtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgICBjb2xvcjogd2hpdGU7XG59XG5cbi5vcHRpb246aG92ZXIge1xuICAgIGNvbG9yOiAjMURCOTU0O1xufVxuXG4ub3B0aW9uOmFjdGl2ZSB7XG4gICAgY29sb3I6ICMxREI5NTQ7XG59Il19 */"

/***/ }),

/***/ "./src/app/modules/room/player/player.component.html":
/*!***********************************************************!*\
  !*** ./src/app/modules/room/player/player.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"fixed-bottom banner player\">\n  <div>\n    <app-error></app-error>\n  </div>\n  <div class=\"row justify-content-md-center\">\n    <div class=\"col-2 player-section\">\n      <p></p>\n      <select class=\"option\" ngModel=\"activeDevice\" (ngModelChange)=\"setDevice($event)\">\n        <option *ngFor=\"let device of devices; let i = index\" [selected]=\"i || i == 0\" [value]=\"device\" [ngValue]=\"device\">\n          {{device}}\n        </option>\n      </select>\n    </div>\n    <div class=\"col player-section\">\n      <p>{{current}}</p>\n      <div class=\"slidecontainer\">\n        <span style=\"width: 10px; float: left\">{{currentPosition | date: 'm:ss'}}</span>\n        <input type=\"range\" min=\"0\" max=\"{{endPositionMs}}\" value=\"{{positionMs}}\" class=\"slider\"\n          style=\"margin-left: 1px\" disabled=\"true\" id=\"player-slider\">\n        <span style=\"width: 10px; float: right\">{{endPosition | date: 'm:ss'}}</span>\n      </div>\n    </div>\n    <div class=\"col-3 player-section left\">\n      <button class=\"mediaBtn reversed\" type=\"button\" (click)=playPaus() style=\"border: none; font-size: 40px;\">\n        <i *ngIf=\"playing\" class=\"fas fa-pause-circle\"></i>\n        <i *ngIf=\"!playing\" class=\"fas fa-play-circle\"></i>\n      </button>\n      <span class=\"warningtext\">\n        <i class=\"fas fa-exclamation-circle\" style=\"font-size: 12px;\"></i>\n        experimental features: Exact synchronization not guaranteed</span>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/modules/room/player/player.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/modules/room/player/player.component.ts ***!
  \*********************************************************/
/*! exports provided: PlayerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerComponent", function() { return PlayerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/websocket/websocket.service */ "./src/app/services/websocket/websocket.service.ts");
/* harmony import */ var src_app_services_error_error_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/error/error.service */ "./src/app/services/error/error.service.ts");




var PlayerComponent = /** @class */ (function () {
    function PlayerComponent(socketService, errorService) {
        this.socketService = socketService;
        this.errorService = errorService;
        this.positionMs = 0;
        this.endPositionMs = 0;
        this.availDevices = [];
        this.listenForFocus();
    }
    PlayerComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Subscribe to the room's playback
        this.socketService.playbackSubject.subscribe(function (message) {
            if (message.messageType === 'CURRENT_TRACK') {
                var playback = message.content;
                _this.currentTrack = playback.track;
                _this.positionMs = playback.positionMs;
                _this.endPositionMs = 0;
                _this.stopPlayerSlider();
                if (_this.currentTrack) {
                    _this.endPositionMs = _this.currentTrack.durationMs;
                    _this.startPlayerSlider();
                }
            }
            else if (message.messageType === 'GET_DEVICES') {
                var devices = JSON.parse(JSON.stringify(message.content));
                _this.availDevices = devices;
            }
        }, function (error) { return _this.errorService.handleError(error.message); });
    };
    PlayerComponent.prototype.playPaus = function () {
        if (this.playing && this.currentTrack) {
            this.playing = false;
            this.socketService.pausPlayback();
        }
        else if (this.currentTrack) {
            this.playing = true;
            this.socketService.startResumePlayback();
        }
        else {
            this.errorService.handleError('No playback available');
        }
        this.toggleActiveSlider();
    };
    PlayerComponent.prototype.setDevice = function (i) {
        var device = this.availDevices.find(function (d) { return d.name === i; });
        this.socketService.setDevice(device);
    };
    PlayerComponent.prototype.startPlayerSlider = function () {
        var _this = this;
        this.interval = setInterval(function () {
            if (_this.positionMs < _this.endPositionMs) {
                _this.positionMs += 10;
            }
        }, 10);
    };
    PlayerComponent.prototype.stopPlayerSlider = function () {
        clearInterval(this.interval);
    };
    PlayerComponent.prototype.toggleActiveSlider = function () {
        document.getElementById('player-slider').classList.toggle('active-slider', this.playing);
    };
    // When window is refocused: stop the slider, get the current playback-time, and re-start it
    PlayerComponent.prototype.listenForFocus = function () {
        var _this = this;
        window.addEventListener('focus', function (event) {
            if (_this.currentTrack) {
                _this.stopPlayerSlider();
                _this.socketService.getPlayback();
                _this.startPlayerSlider();
            }
        });
    };
    Object.defineProperty(PlayerComponent.prototype, "currentPosition", {
        get: function () {
            return new Date(this.positionMs);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerComponent.prototype, "endPosition", {
        get: function () {
            return new Date(this.endPositionMs);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerComponent.prototype, "current", {
        get: function () {
            if (this.currentTrack) {
                return (this.currentTrack.name + ' – ' + this.currentTrack.artists.slice(0, 2).map(function (a) { return ' ' + a; }));
            }
            else {
                return '';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerComponent.prototype, "devices", {
        get: function () {
            return this.availDevices.map(function (device) { return device.name; });
        },
        enumerable: true,
        configurable: true
    });
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], PlayerComponent.prototype, "roomId", void 0);
    PlayerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-player',
            template: __webpack_require__(/*! ./player.component.html */ "./src/app/modules/room/player/player.component.html"),
            styles: [__webpack_require__(/*! ./player.component.css */ "./src/app/modules/room/player/player.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_2__["WebsocketService"], src_app_services_error_error_service__WEBPACK_IMPORTED_MODULE_3__["ErrorService"]])
    ], PlayerComponent);
    return PlayerComponent;
}());



/***/ }),

/***/ "./src/app/modules/room/queue/queue.component.css":
/*!********************************************************!*\
  !*** ./src/app/modules/room/queue/queue.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvcm9vbS9xdWV1ZS9xdWV1ZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/modules/room/queue/queue.component.html":
/*!*********************************************************!*\
  !*** ./src/app/modules/room/queue/queue.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container align-self-center\" style=\"height: 100%\">\n  <h5>Next up</h5>\n  <ul class=\"list-group\" *ngFor=\"let result of results\">\n    <li class=\"list-group-item list-item\">{{result}}</li>\n  </ul>\n</div>"

/***/ }),

/***/ "./src/app/modules/room/queue/queue.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/modules/room/queue/queue.component.ts ***!
  \*******************************************************/
/*! exports provided: QueueComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueueComponent", function() { return QueueComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/websocket/websocket.service */ "./src/app/services/websocket/websocket.service.ts");
/* harmony import */ var src_app_services_error_error_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/error/error.service */ "./src/app/services/error/error.service.ts");




var QueueComponent = /** @class */ (function () {
    function QueueComponent(socketService, errorService) {
        var _this = this;
        this.socketService = socketService;
        this.errorService = errorService;
        this.tracks = [];
        this.socketService.trackQueueSubject.subscribe(function (queue) {
            _this.tracks = queue;
        }, function (error) { return _this.errorService.handleError(error); });
    }
    QueueComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(QueueComponent.prototype, "results", {
        get: function () {
            // Only show the two first artists for a given track
            return this.tracks.map(function (track) { return track.name + ' - ' + track.artists.slice(0, 2).map(function (artist) { return ' ' + artist; }); });
        },
        enumerable: true,
        configurable: true
    });
    QueueComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-queue',
            template: __webpack_require__(/*! ./queue.component.html */ "./src/app/modules/room/queue/queue.component.html"),
            styles: [__webpack_require__(/*! ./queue.component.css */ "./src/app/modules/room/queue/queue.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_2__["WebsocketService"], src_app_services_error_error_service__WEBPACK_IMPORTED_MODULE_3__["ErrorService"]])
    ], QueueComponent);
    return QueueComponent;
}());



/***/ }),

/***/ "./src/app/modules/room/room-routing.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/modules/room/room-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: RoomRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoomRoutingModule", function() { return RoomRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _room_room_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./room/room.component */ "./src/app/modules/room/room/room.component.ts");




var routes = [
    {
        path: ':id',
        component: _room_room_component__WEBPACK_IMPORTED_MODULE_3__["RoomComponent"]
    }
];
var RoomRoutingModule = /** @class */ (function () {
    function RoomRoutingModule() {
    }
    RoomRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], RoomRoutingModule);
    return RoomRoutingModule;
}());



/***/ }),

/***/ "./src/app/modules/room/room.module.ts":
/*!*********************************************!*\
  !*** ./src/app/modules/room/room.module.ts ***!
  \*********************************************/
/*! exports provided: RoomModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoomModule", function() { return RoomModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _room_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./room-routing.module */ "./src/app/modules/room/room-routing.module.ts");
/* harmony import */ var _room_room_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./room/room.component */ "./src/app/modules/room/room/room.component.ts");
/* harmony import */ var _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./navbar/navbar.component */ "./src/app/modules/room/navbar/navbar.component.ts");
/* harmony import */ var _userlist_userlist_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./userlist/userlist.component */ "./src/app/modules/room/userlist/userlist.component.ts");
/* harmony import */ var _player_player_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./player/player.component */ "./src/app/modules/room/player/player.component.ts");
/* harmony import */ var _queue_queue_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./queue/queue.component */ "./src/app/modules/room/queue/queue.component.ts");
/* harmony import */ var _search_search_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./search/search.component */ "./src/app/modules/room/search/search.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_shared_components_error_error_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/shared/components/error/error.component */ "./src/app/shared/components/error/error.component.ts");












var RoomModule = /** @class */ (function () {
    function RoomModule() {
    }
    RoomModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_room_room_component__WEBPACK_IMPORTED_MODULE_4__["RoomComponent"], _navbar_navbar_component__WEBPACK_IMPORTED_MODULE_5__["NavbarComponent"], _userlist_userlist_component__WEBPACK_IMPORTED_MODULE_6__["UserlistComponent"], _player_player_component__WEBPACK_IMPORTED_MODULE_7__["PlayerComponent"], _queue_queue_component__WEBPACK_IMPORTED_MODULE_8__["QueueComponent"], _search_search_component__WEBPACK_IMPORTED_MODULE_9__["SearchComponent"], src_app_shared_components_error_error_component__WEBPACK_IMPORTED_MODULE_11__["ErrorComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _room_routing_module__WEBPACK_IMPORTED_MODULE_3__["RoomRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ReactiveFormsModule"],
            ]
        })
    ], RoomModule);
    return RoomModule;
}());



/***/ }),

/***/ "./src/app/modules/room/room/room.component.css":
/*!******************************************************!*\
  !*** ./src/app/modules/room/room/room.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "div.column {\n    border-right: 1px solid rgba(255, 255, 255, 0.071);\n    height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9yb29tL3Jvb20vcm9vbS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksa0RBQWtEO0lBQ2xELFlBQVk7QUFDaEIiLCJmaWxlIjoic3JjL2FwcC9tb2R1bGVzL3Jvb20vcm9vbS9yb29tLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJkaXYuY29sdW1uIHtcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDcxKTtcbiAgICBoZWlnaHQ6IDEwMCU7XG59Il19 */"

/***/ }),

/***/ "./src/app/modules/room/room/room.component.html":
/*!*******************************************************!*\
  !*** ./src/app/modules/room/room/room.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navbar [roomId]=roomId [displayName]=displayName>\n</app-navbar>\n<div class=\"\">\n  <div class=\"row justify-content-md-center\" style=\"margin-top: 6em; height: 20em\">\n    <div class=\"col-3 column\">\n      <app-userlist></app-userlist>\n    </div>\n    <div class=\"col column\">\n      <app-queue></app-queue>\n    </div>\n    <div class=\"col-3\">\n      <app-search [roomId]=roomId></app-search>\n    </div>\n  </div>\n</div>\n<div>\n  <app-player [roomId]=roomId></app-player>\n</div>"

/***/ }),

/***/ "./src/app/modules/room/room/room.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/modules/room/room/room.component.ts ***!
  \*****************************************************/
/*! exports provided: RoomComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoomComponent", function() { return RoomComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/websocket/websocket.service */ "./src/app/services/websocket/websocket.service.ts");
/* harmony import */ var src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/user/user.service */ "./src/app/services/user/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");





var RoomComponent = /** @class */ (function () {
    function RoomComponent(socketService, userService, route) {
        var _this = this;
        this.socketService = socketService;
        this.userService = userService;
        this.route = route;
        this.roomId = this.route.snapshot.paramMap.get('id');
        this.userService.getUserDisplayName().subscribe(function (msg) { return _this.displayName = msg.response; });
        if (!this.socketService.isConnected()) {
            this.socketService.connectToRoom(this.roomId);
        }
        else {
            setTimeout(function () {
                _this.socketService.subscribeToRoom(_this.roomId);
            }, 600);
        }
    }
    RoomComponent.prototype.ngOnInit = function () {
    };
    RoomComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-room',
            template: __webpack_require__(/*! ./room.component.html */ "./src/app/modules/room/room/room.component.html"),
            styles: [__webpack_require__(/*! ./room.component.css */ "./src/app/modules/room/room/room.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_2__["WebsocketService"], src_app_services_user_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], RoomComponent);
    return RoomComponent;
}());



/***/ }),

/***/ "./src/app/modules/room/search/search.component.css":
/*!**********************************************************!*\
  !*** ./src/app/modules/room/search/search.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZHVsZXMvcm9vbS9zZWFyY2gvc2VhcmNoLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/modules/room/search/search.component.html":
/*!***********************************************************!*\
  !*** ./src/app/modules/room/search/search.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"form\" (ngSubmit)=\"submit()\">\n  <div class=\"input-group mb-3\">\n    <input type=\"text\" class=\"form-control mediaBtn-search\" placeholder=\"Search song...\" formControlName=\"searchInput\">\n    <div class=\"input-group-append\">\n      <button class=\"mediaBtn-outline\" type=\"button\" (click)=\"submit()\">Search</button>\n    </div>\n  </div>\n  <div class=\"overflow-auto\" style=\"max-height: 20em;\">\n    <ul class=\"list-group\" *ngFor=\"let result of results; let i = index\">\n      <li>\n        <button type=\"button\" class=\"list-group-item list-item mediaBtn\" (click)=\"queueTrack(i)\"\n          style=\"text-align: left;\">\n          <i class=\" fas fa-plus\" style=\"font-size: 12px; margin-left: -15px\"></i>\n          <span style=\"margin-left:10px\">{{result}}</span>\n        </button>\n      </li>\n    </ul>\n  </div>\n</form>"

/***/ }),

/***/ "./src/app/modules/room/search/search.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/modules/room/search/search.component.ts ***!
  \*********************************************************/
/*! exports provided: SearchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchComponent", function() { return SearchComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_services_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/websocket/websocket.service */ "./src/app/services/websocket/websocket.service.ts");
/* harmony import */ var src_app_services_error_error_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/error/error.service */ "./src/app/services/error/error.service.ts");





var SearchComponent = /** @class */ (function () {
    function SearchComponent(socketService, errorService, fb) {
        var _this = this;
        this.socketService = socketService;
        this.errorService = errorService;
        this.fb = fb;
        this.searchResults = [];
        // Subscribe to the search-results
        this.socketService.searchResultSubject.subscribe(function (tracks) {
            tracks.forEach(function (track) { return _this.searchResults.push(track); });
        }, function (error) { return _this.errorService.handleError(error); });
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            searchInput: [, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
    };
    SearchComponent.prototype.submit = function () {
        this.search();
    };
    SearchComponent.prototype.queueTrack = function (i) {
        var track = this.searchResults[i];
        this.socketService.queueTrack(this.roomId, track);
    };
    SearchComponent.prototype.search = function () {
        this.searchResults = [];
        this.socketService.searchTrack(this.searchInput);
    };
    Object.defineProperty(SearchComponent.prototype, "searchInput", {
        get: function () {
            return this.form.get('searchInput').value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchComponent.prototype, "results", {
        get: function () {
            // Only show the two first artists for a given track
            return this.searchResults.map(function (track) { return track.name + ' – ' + track.artists.slice(0, 2).map(function (r) { return ' ' + r; }); });
        },
        enumerable: true,
        configurable: true
    });
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], SearchComponent.prototype, "roomId", void 0);
    SearchComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-search',
            template: __webpack_require__(/*! ./search.component.html */ "./src/app/modules/room/search/search.component.html"),
            styles: [__webpack_require__(/*! ./search.component.css */ "./src/app/modules/room/search/search.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_3__["WebsocketService"], src_app_services_error_error_service__WEBPACK_IMPORTED_MODULE_4__["ErrorService"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]])
    ], SearchComponent);
    return SearchComponent;
}());



/***/ }),

/***/ "./src/app/modules/room/userlist/userlist.component.css":
/*!**************************************************************!*\
  !*** ./src/app/modules/room/userlist/userlist.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "i.online {\n    vertical-align: 2px;\n    font-size: 8px;\n    color: #1DB954;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbW9kdWxlcy9yb29tL3VzZXJsaXN0L3VzZXJsaXN0LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxtQkFBbUI7SUFDbkIsY0FBYztJQUNkLGNBQWM7QUFDbEIiLCJmaWxlIjoic3JjL2FwcC9tb2R1bGVzL3Jvb20vdXNlcmxpc3QvdXNlcmxpc3QuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImkub25saW5lIHtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogMnB4O1xuICAgIGZvbnQtc2l6ZTogOHB4O1xuICAgIGNvbG9yOiAjMURCOTU0O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/modules/room/userlist/userlist.component.html":
/*!***************************************************************!*\
  !*** ./src/app/modules/room/userlist/userlist.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container align-self-center\" style=\"height: 100%\">\n    <h5>Active users</h5>\n    <div class=\"overflow-auto\" style=\"max-height: 10em;\">\n      <ul class=\"list-group\" *ngFor=\"let u of users\">\n        <li class=\"list-group-item list-item\">\n          {{u.displayName}}\n          <i class=\"fas fa-circle online\" *ngIf=\"u.isActive\"></i>\n        </li>\n      </ul>\n    </div>\n  \n  </div>\n"

/***/ }),

/***/ "./src/app/modules/room/userlist/userlist.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/modules/room/userlist/userlist.component.ts ***!
  \*************************************************************/
/*! exports provided: UserlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserlistComponent", function() { return UserlistComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/websocket/websocket.service */ "./src/app/services/websocket/websocket.service.ts");
/* harmony import */ var src_app_services_error_error_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/error/error.service */ "./src/app/services/error/error.service.ts");




var UserlistComponent = /** @class */ (function () {
    function UserlistComponent(socketService, errorService) {
        var _this = this;
        this.socketService = socketService;
        this.errorService = errorService;
        this.users = [];
        // Subscribe
        this.socketService.userSubject.subscribe(function (msg) {
            switch (msg.messageType.toString()) {
                case 'SUBSCRIBE':
                    var users = JSON.parse(JSON.stringify(msg.content));
                    _this.users = users;
                    break;
                case 'UNSUBSCRIBE':
                    var user_1 = JSON.parse(JSON.stringify(msg.content));
                    var i = _this.users.findIndex(function (iUser) { return iUser.displayName === user_1.displayName; });
                    _this.users.splice(i);
                    break;
                case 'IS_ACTIVE':
                    var foo_1 = JSON.parse(JSON.stringify(msg.content));
                    var bar = _this.users.findIndex(function (iUser) { return iUser.displayName === foo_1.displayName; });
                    _this.users.splice(bar, 1, foo_1);
                    break;
            }
        }, function (error) { return _this.errorService.handleError(error); });
    }
    UserlistComponent.prototype.ngOnInit = function () {
    };
    UserlistComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-userlist',
            template: __webpack_require__(/*! ./userlist.component.html */ "./src/app/modules/room/userlist/userlist.component.html"),
            styles: [__webpack_require__(/*! ./userlist.component.css */ "./src/app/modules/room/userlist/userlist.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_websocket_websocket_service__WEBPACK_IMPORTED_MODULE_2__["WebsocketService"], src_app_services_error_error_service__WEBPACK_IMPORTED_MODULE_3__["ErrorService"]])
    ], UserlistComponent);
    return UserlistComponent;
}());



/***/ }),

/***/ "./src/app/shared/components/error/error.component.css":
/*!*************************************************************!*\
  !*** ./src/app/shared/components/error/error.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".close {\n    color: white;\n    cursor: pointer;\n}\n\ndiv.alert {\n    text-align: center;\n    background-color: #F42C04;\n    border-color: #F42C04;\n    outline: #F42C04;\n    text-shadow: none;\n    color: white;\n    margin-bottom: auto;\n    width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvZXJyb3IvZXJyb3IuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFlBQVk7SUFDWixlQUFlO0FBQ25COztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLHlCQUF5QjtJQUN6QixxQkFBcUI7SUFDckIsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLFdBQVc7QUFDZiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2Vycm9yL2Vycm9yLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2xvc2Uge1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbmRpdi5hbGVydCB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNGNDJDMDQ7XG4gICAgYm9yZGVyLWNvbG9yOiAjRjQyQzA0O1xuICAgIG91dGxpbmU6ICNGNDJDMDQ7XG4gICAgdGV4dC1zaGFkb3c6IG5vbmU7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XG4gICAgd2lkdGg6IDEwMCU7XG59Il19 */"

/***/ }),

/***/ "./src/app/shared/components/error/error.component.html":
/*!**************************************************************!*\
  !*** ./src/app/shared/components/error/error.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"showError\" class=\"alert alert-danger alert-dismissable\">\n  {{error}}\n  <a class=\"close\" style=\"float: right;\" (click)=\"removeError()\">&times;</a>\n</div>"

/***/ }),

/***/ "./src/app/shared/components/error/error.component.ts":
/*!************************************************************!*\
  !*** ./src/app/shared/components/error/error.component.ts ***!
  \************************************************************/
/*! exports provided: ErrorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorComponent", function() { return ErrorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_error_error_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/error/error.service */ "./src/app/services/error/error.service.ts");



var ErrorComponent = /** @class */ (function () {
    function ErrorComponent(errorService) {
        var _this = this;
        this.errorService = errorService;
        this.errorService.getErrorSubject().subscribe(function (error) {
            _this.error = error;
        });
    }
    ErrorComponent.prototype.ngOnInit = function () {
    };
    ErrorComponent.prototype.removeError = function () {
        this.error = null;
    };
    Object.defineProperty(ErrorComponent.prototype, "showError", {
        get: function () {
            return this.error != null;
        },
        enumerable: true,
        configurable: true
    });
    ErrorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-error',
            template: __webpack_require__(/*! ./error.component.html */ "./src/app/shared/components/error/error.component.html"),
            styles: [__webpack_require__(/*! ./error.component.css */ "./src/app/shared/components/error/error.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_error_error_service__WEBPACK_IMPORTED_MODULE_2__["ErrorService"]])
    ], ErrorComponent);
    return ErrorComponent;
}());



/***/ })

}]);
//# sourceMappingURL=modules-room-room-module.js.map