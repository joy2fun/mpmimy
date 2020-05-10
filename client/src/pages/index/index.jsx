import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.css'

import Riddle from '../../components/riddle/index'
import ViewedRiddle from '../../components/viewedriddle/index'

export default class Index extends Component {
  items = []
  constructor () {
    this.state = {
      id: 0,
      questionType: '',
      questionContent: `按住屏幕向下拖拽开始猜谜语`,
      answerContent: '',
    }
  }

  config = {
    navigationBarTitleText: '谜语机器人'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onPullDownRefresh() {
    Taro.showToast({
      icon: 'loading',
      duration: 4000
    })
    Taro.cloud
      .callFunction({
        name: "bridge",
        data: {}
      })
      .then(res => {
        const data = res.result.data
        console.log(data)
        Taro.hideToast()
        Taro.stopPullDownRefresh()
        this.refs.riddle.reset()
        this.setState({
          id: data.id,
          questionType: data.info,
          questionContent: data.question,
          answerContent: data.answer,
        })
        // this.updateHistory()
      })
      .catch(e => {
        console.log(e)
        Taro.stopPullDownRefresh()
        Taro.showToast({
          icon: 'none',
          title: '请求超时，请重试',
        })
      })
  }

  updateHistory () {
    if (this.state.id > 0) {
      if (this.items.length > 9) {
        this.items.pop()
      }
      this.items.unshift({
        id: this.state.id,
        info: this.state.questionType,
        question: this.state.questionContent,
        answer: this.state.answerContent,
      })
    }
  }

  render () {
    return (
      <View className='index'>
        <Riddle
          ref='riddle'
          seq={this.state.id}
          questionType={this.state.questionType}
          questionContent={this.state.questionContent}
          answerContent={this.state.answerContent}
          />
        {/* <View className='viewed'>
          {this.items.map(item => {
            return <ViewedRiddle key={item.id} item={item} />
          })}
        </View> */}
      </View>
    )
  }
}
