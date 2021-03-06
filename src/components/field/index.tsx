import Taro from '@tarojs/taro'
import { View, Text, RichText, Map } from '@tarojs/components'
// import transform from '@tarojs/transformer-wx'
import { AtInput, AtTextarea, AtToast, AtRadio } from 'taro-ui'
import { Ichild } from '../form/interface'
import NumberInput from './NumberInput'
import Percentage from './Percentage'
import Currency from './Currency'
import Boolean from './Boolean'
import Date from './Date'
import CpRadio from './Radio'
import Multiselect from './Multiselect'
import Timestamp from './Timestamp'
import DisplayText from './DisplayText'
import Formula from './Formula'
import ImageSingle from './ImageSingle'
import I18NNumber from './I18NNumber'
import CpMap from './Map'
import './index.scss'


interface IControl {
  child: Ichild;
  value: any;
  name?: string;
  label?: string;
  onChange?: Function;
}


// 大量的 if 但是没办法

export default class Control extends Taro.PureComponent<IControl> {

  static defaultProps = {
    child: {},
    onChange: () => {},
  }

  // static options = {
  //   styleIsolation: 'shared'
  // } 

  render() {
    const { child, onChange, label, name, value } = this.props
    const { type, ...otherProps } = child
    otherProps.value = value
    otherProps.onChange = onChange
    if (
      type === 'URL' || 
      type === 'TEXT' || 
      type === 'EMAIL' || 
      type === 'TELPHONE'
    ) {
      return (
        <AtInput 
          border={false}
          name={name}
          type='text'
          {...otherProps}
        />
      )
    }
    if (type === 'TEXTAREA') {
      const value = otherProps.value || ""
      return (
        <AtTextarea {...otherProps} value={value} />
      )
    }
    if (type === 'INT' || type === 'DOUBLE') {
      return (
        <NumberInput 
          name={name}
          {...otherProps}
        />
      )
    }
    if (type === 'BOOLEAN') {
      return (
        <Boolean 
          {...otherProps}
        />
      )
    }
    if (type === 'CURRENCY') {
      return (
        <Currency 
          name={name}
          {...otherProps}
        />
      )
    }
    if (type === 'PERCENTAGE') {
      return (
        <Percentage 
          name={name}
          {...otherProps}
        />
      )
    }
    if (type === 'DATE') {
      return (
        <Date 
          label={label}
          {...otherProps}
        />
      )
    }
    if (type === 'TIMESTAMP') {
      return (
        <Timestamp 
          label={label}
          {...otherProps}
        />
      )
    }
    if (type === 'RADIO') {
      return (
        <CpRadio
          label={label}
          {...otherProps}
        />
      )
    }
    if (type === 'MULTISELECT') {
      return (
        <Multiselect
          label={label}
          {...otherProps}
        />
      )
    }
    if (type === 'RADIOTREE') {
      return (
        <Multiselect
          label={label}
          {...otherProps}
        />
      )
    }
    if (type === 'CELLPHONE') {
      return (
        <AtInput 
          border={false}
          name={name}
          type='number'
          {...otherProps}
        />
      )
    }
    if (
      type === 'TELPHONEI18N' ||
      type === 'CELLPHONEI18N' 
    ) {
      return (
        <I18NNumber name={name} {...otherProps} />
      )
    }
    if (type === 'RICHTEXT') {
      return <RichText nodes={[{
        name: 'div',
        attrs: {
          class: 'div_class',
          style: 'line-height: 60px; color: blue;'
        },
        children: [{
          type: 'text',
          text: 'Hello World!'
        }]
      }]} />
    }
    if (type === 'AUTONUMBER') {
      return <DisplayText {...otherProps} />
    }
    if (type === 'MAP') {
      return <CpMap label={label} {...otherProps} />
    }
    if (type === 'FORMULA') {
      return <Formula {...otherProps} />
    }
    if (type === 'IMAGE_SINGLE') {
      return <ImageSingle {...otherProps} />
    }
    return <View className="unregistered">未注册的字段类型</View>
  }
}
