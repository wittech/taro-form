import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCalendar, AtActionSheet, AtActionSheetItem, AtIcon } from "taro-ui"
import FieldDecorator from '../FieldDecorator'
import { actionSheetCancelText } from '../utils'

interface IDate {
  label?: string;
  placeholder?: string;
  [otherProps: string]: any;
}
export default class Date extends Taro.PureComponent<IDate> {

  state = {
    visible: false,
  }

  handleVisible = () => {
    this.setState({
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  onSelectDate = ({value}) => {
    const { onChange } = this.props
    const { start } = value
    onChange(start)
    this.onClose()
  }

  render() {
    const { visible } = this.state
    const { placeholder, label, value } = this.props
    return (
      <FieldDecorator 
        onClick={this.handleVisible}
        content={value}
        placeholder={placeholder}
      >
        <AtActionSheet 
          title={label}
          onClose={this.onClose}
          isOpened={visible}
          cancelText={actionSheetCancelText} 
        >
          <AtActionSheetItem>
            <AtCalendar 
              isVertical
              currentDate={value}
              onSelectDate={this.onSelectDate}
            />
          </AtActionSheetItem>
        </AtActionSheet>
      </FieldDecorator>
    )
  }
}

