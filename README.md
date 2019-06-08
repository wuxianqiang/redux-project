# 更新已渲染的元素
```js
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

function Tick() {
  const ele = (
    <div>
      <h1>当前时间</h1>
      { new Date().toLocaleTimeString() }
    </div>
  )
  ReactDOM.render(ele, document.getElementById('root'));
}

setInterval(Tick, 1000)
```
1. React 元素都是 `immutable` 不可变的。当元素被创建之后，你是无法改变其内容或属性的。一个元素就好像是动画里的一帧，它代表应用界面在某一时间点的样子
2. 更新界面的唯一办法是创建一个新的元素，然后将它传入 `ReactDOM.render()` 方法

# 函数组件
```js
function Welcome (props) {
  return <h1>Welcome {props.name}</h1>
}
ReactDOM.render(<Welcome name='react' />, document.getElementById('root'));
```
1. 函数组件接收一个单一的 `props` 对象并返回了一个React元素
# 类组件
```js
class Welcome extends React.Component {
  render() {
    return (
      <h1>Welcome { this.props.name }</h1>
    );
  }
}
ReactDOM.render(<Welcome name='react' />, document.getElementById('root'));
```
1. 组件名称必须以大写字母开头
2. 组件的返回值只能有一个根元素
# props
1. 无论是使用函数或是类来声明一个组件，它决**不能修改它自己的props**
2. 所有 React 组件都必须是纯函数，并禁止修改其自身 props 。
# 类型检查
1. React 内置了类型检测的功能。要在组件中进行类型检测，你可以赋值 `propTypes` 属性。
## 定义类型
```js
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // 你可以声明一个 prop 是一个特定的 JS 原始类型。 
  // 默认情况下，这些都是可选的。
  optionalArray: PropTypes.array, // 数组
  optionalBool: PropTypes.bool, // 布尔值
  optionalFunc: PropTypes.func, // 函数
  optionalNumber: PropTypes.number, // 数字
  optionalObject: PropTypes.object, // 对象
  optionalString: PropTypes.string, // 字符串
  optionalSymbol: PropTypes.symbol, // symbol

  // 任何东西都可以被渲染:numbers, strings, elements,或者是包含这些类型的数组(或者是片段)。
  optionalNode: PropTypes.node,

  // 一个 React 元素。
  optionalElement: PropTypes.element,

  // 你也可以声明一个 prop 是类的一个实例。 
  // 使用 JS 的 instanceof 运算符。
  optionalMessage: PropTypes.instanceOf(Message),

  // 你可以声明 prop 是特定的值，类似于枚举
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 一个对象可以是多种类型其中之一
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 一个某种类型的数组
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 属性值为某种类型的对象
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 一个特定形式的对象
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // 你可以使用 `isRequired' 链接上述任何一个，以确保在没有提供 prop 的情况下显示警告。
  requiredFunc: PropTypes.func.isRequired,

  // 任何数据类型的值
  requiredAny: PropTypes.any.isRequired,

  // 你也可以声明自定义的验证器。如果验证失败返回 Error 对象。不要使用 `console.warn` 或者 throw ，
  // 因为这不会在 `oneOfType` 类型的验证器中起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 也可以声明`arrayOf`和`objectOf`类型的验证器，如果验证失败需要返回Error对象。
  // 会在数组或者对象的每一个元素上调用验证器。验证器的前两个参数分别是数组或者对象本身，
  // 以及当前元素的键值。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```
## 开始使用
```js
class Welcome extends React.Component {
  render() {
    return (
      <h1>Welcome { this.props.name }</h1>
    );
  }
}
Welcome.propTypes = {
  name: PropTypes.string
}
```
如果你在使用像 `transform-class-properties` 的 Babel 转换器，你也可以在 React 组件类中声明 `defaultProps` 作为静态属性。
```js
class Welcome extends React.Component {
  static propTypes = {
    name: PropTypes.string
  }
  render() {
    return (
      <h1>Welcome { this.props.name }</h1>
    );
  }
}
```
> 1. 函数组件和类组件都可以使用，没有任何区别。
> 2. 类型检查不影响页面的渲染，只是在控制台报错提示用户。
# 状态
1. 组件的数据来源有两个地方，分别是属性对象和状态对象
2. 属性是父组件传递过来的(默认属性，属性校验)
3. 状态是自己内部的,改变状态唯一的方式就是 `setState`
4. 属性和状态的变化都会影响视图更新
5. 不要直接修改 `state`
6. 构造函数是唯一可以给 `this.state` 赋值的地方

```js
class Welcome extends React.Component {
  constructor () {
    super()
    this.state = {
      count: 0
    }
  }
  handleClick = () => {
    this.setState({count: this.state.count + 1})
  }
  render() {
    return (
      <div>
        <span>{ this.state.count }</span>
        <button onClick={ this.handleClick }>+1</button>
      </div>
    );
  }
}
```
