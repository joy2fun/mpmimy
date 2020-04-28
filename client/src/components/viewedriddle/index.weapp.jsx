import Taro, { Component } from "@tarojs/taro"
import { View, Text, Button } from "@tarojs/components"
import './index.css'

export default class Login extends Component {
  constructor(props) {
    super(...arguments)
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="item">
        <View className="q">{this.props.item.question}</View>
        <View className="a">{this.props.item.info}，谜底：{this.props.item.answer}</View>
      </View>
    )
  }
}
