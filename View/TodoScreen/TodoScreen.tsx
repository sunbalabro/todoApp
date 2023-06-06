import React, { FC } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import  AddTodo  from '../AddTodo/AddTodo'
import  ListOfTodos  from '../ListOfTodos/ListOfTodos'

import { Box } from 'native-base';
export const TodoScreen :FC = () => { 
const { container } = styles
 return(
  <View style={container}>
      <Box 
      style={{width: '100%'}}
    bg="#800080" p={4} _text={{
    
  }}>
    <Text style={{color: 'white' , fontSize: 30,fontWeight: "bold"}}>Todo List</Text> 
    </Box>
    <AddTodo />
    <ListOfTodos />
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   justifyContent: 'center',
   alignItems: 'center',
 },
 header:{
   textAlign: 'center',
   fontSize: 60,
   color: '#9a009a',
   fontWeight: 'bold'
 }

})