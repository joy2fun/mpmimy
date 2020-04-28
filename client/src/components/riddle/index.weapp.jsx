import Taro, { Component } from "@tarojs/taro"
import { View, Text, Button, Input } from "@tarojs/components"
import { AtButton, AtCard, AtSwitch, AtInput, AtDivider, AtIcon, AtList, AtListItem } from 'taro-ui'
import arrowDownSvg from '../../assets/arrow-down.svg'

import './index.css'

export default class Riddle extends Component {
  constructor(props) {
    super(...arguments)
    this.focusing = false
    this.checkingTimerId = null
    this.state = this.defaults()
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  handleFocus(value) {
    this.focusing = true
    return value
  }

  verify(value) {
    console.log(value, this.props.answerContent)
    const v = value.replace(/^\s+/, '').replace(/\s+$/, '')
    if (v.length === 0) {
      return false
    }
    return this.props.answerContent.split(',').findIndex(item => {
      return item.indexOf(v) != -1
    }) != -1
  }

  handleBlur(value) {
    this.focusing = false
    return value
  }

  handleChange(value) {
    console.log('c')
    this.setState({value})
    const ok = this.verify(value)

    if (ok || !this.focusing) {
      this.delayCheck(value, ok)
    }

    if (ok) {
      return ''
    }
  }

  delayCheck(value, ok) {
    const v = value.replace(/^\s+/, '').replace(/\s+$/, '')
    if (v.length === 0) {
      return
    }
    // pretending working hard
    Taro.showToast({
      duration: 200,
      icon: "loading",
    })
    if (this.checkingTimerId) {
      clearTimeout(this.checkingTimerId)
    }
    this.checkingTimerId = setTimeout(() => {
      if (ok) {
        Taro.showToast({
          icon: 'success',
          title: '你真棒',
          duration: 3000,
        })
        this.finish()
      } else {
        Taro.showToast({
          icon: 'none',
          title: '好像不对，请再试一试',
          duration: 2500,
        })
      }
    }, 500)
  }

  handlePeek() {
    this.finish()
  }

  finish() {
    this.setState({
      answerMask: '参考谜底：' + this.props.answerContent,
      peeked: true,
      hint: '向下拖拽刷新谜语',
      value: '',
    })
  }

  reset() {
    this.setState(this.defaults())
  }

  defaults() {
    return {
      answerMask: '',
      peeked: false,
      hint: '请输入谜底',
      value: '',
    }
  }


  render() {
    console.log(this.state);
    return (
      <View className='index'>
        <AtCard
          title='谜语'
          icon={{ value: 'help', color: '#77a1fd', size: 20 }}
        >
          <View className="question">
            {this.props.questionContent}
            {!this.props.seq ? <Image className="blinking" src={arrowDownSvg} /> : ''}
          </View>
          <View className="info">
            {this.props.questionType}
          </View>
          <View className="peek-wrap">
            {this.state.peeked
              ? <View className="answer-mask">{this.state.answerMask}</View>
              : (this.props.seq
                ? <AtIcon value='eye' color='#f90' onClick={this.handlePeek.bind(this)}></AtIcon>
                : '')

            }
          </View>
        </AtCard>
        {this.props.answerContent ?
          <View className='answer-wrap'>
            <View className="answer-form">
              <View className='answer-input'>
                <AtInput
                  clear={true}
                  type='text'
                  placeholder={this.state.hint}
                  onFocus={this.handleFocus.bind(this)}
                  onBlur={this.handleBlur.bind(this)}
                  onChange={this.handleChange.bind(this)}
                  border={false}
                  value={this.state.value}
                  disabled={this.state.peeked}
                />
              </View>
            </View>
          </View>
          : ''
        }
      </View>
    )
  }
}
