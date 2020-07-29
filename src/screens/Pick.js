import React,{useState} from 'react';
import {Text,View,Picker} from 'react-native';


const Pick = () => {
    const Item = Picker.Item;
    const [value,setValue ] = useState('');
return(
<Picker
      mode='dropdown'
      selectedValue={value}
      
      onValueChange={(v) => setValue(v)}>
      <Item label="30" value="key0" />
      <Item label="60" value="key1" />
      <Item label="30" value="key0" />
      <Item label="60" value="key1" />
      <Item label="30" value="key0" />
      <Item label="60" value="key1" />
      <Item label="30" value="key0" />
      <Item label="60" value="key1" />
    </Picker>)

};


export default Pick;
