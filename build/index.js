"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withProps = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const withProps = (Component, contextMap) => {
  return props => {
    const contextProps = Object.entries(contextMap).reduce((accum, [key, Context]) => {
      accum[key] = (0, _react.useContext)(Context);
      return accum;
    }, {});
    return _react.default.createElement(Component, _extends({}, contextProps, props));
  };
};

exports.withProps = withProps;