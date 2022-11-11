"use strict";
exports.__esModule = true;
var react_1 = require("@ionic/react");
require("./AreaLogList.css");
var AreaLogList = function (props) {
    var areaHistory = props.areaLogs.log;
    var dateFormatter = function (date) {
        var newDate = new Date(date);
        return newDate.toLocaleString();
    };
    return (React.createElement(react_1.IonCard, { className: "log-list-card" },
        React.createElement(react_1.IonCardContent, null,
            React.createElement(react_1.IonList, null,
                React.createElement("h2", null, "\u0399\u03C3\u03C4\u03BF\u03C1\u03B9\u03BA\u03CC \u03A0\u03B5\u03C1\u03B9\u03BF\u03C7\u03AE\u03C2"),
                areaHistory.map(function (log) { return (React.createElement(react_1.IonItem, { key: log._id, className: "log-list-item" },
                    React.createElement(react_1.IonGrid, null,
                        React.createElement(react_1.IonRow, null,
                            React.createElement(react_1.IonCol, { className: "text" }, dateFormatter(log.datetime)),
                            React.createElement(react_1.IonCol, { size: "auto" },
                                log.status === "ΝΑΙ" && (React.createElement("li", { className: "is-active" }, "\u0394\u03B9\u03B1\u03BD\u03BF\u03BC\u03AE")),
                                log.status === "ΟΧΙ" && (React.createElement("li", { className: "is-inactive" }, "\u0394\u03B9\u03B1\u03BA\u03BF\u03C0\u03AE"))))))); })))));
};
exports["default"] = AreaLogList;
