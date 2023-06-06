import React, { FC, useState } from 'react'
import uuid from 'react-native-uuid';
import { View, Text, StyleSheet, TextInput, Modal, Pressable  , Image} from 'react-native'
import { useDispatch } from 'react-redux';
import { addTodos } from '../../Store/reducer';
import {Fab} from 'native-base';
const AddTodo: FC = () => {
const [val , setVal] = useState('')
const [modalVisible, setModalVisible] = useState(false);
 
const dispatch = useDispatch()
const handleChange = (e: any) =>{
    setVal(e)
}
const onPress = () =>{
  setModalVisible(!modalVisible)
}
const handleModalClose = () => {

    if(val.length !== 0){
      const todo = {
        todoValue: val,
        id: uuid.v4().toString(),
        checked: false
      }
      dispatch(addTodos(todo))
      setVal('')
  } else {
    setModalVisible(!modalVisible)
    setVal('')
  }

}
  const { container , modalFlex , cancelBtn } = styles
  return (
    <View style={container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>What's new for today</Text>
            <TextInput placeholder='Write your new value' onChangeText={handleChange} style={{ borderBottomColor: 'purple', borderBottomWidth: 1, marginBottom: 10 }}></TextInput>
            <View style={modalFlex}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleModalClose()}>
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
              <Pressable
                style={cancelBtn}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </Modal>
      <Fab
      
      style={{ backgroundColor: 'white'}}
      placement="bottom-right"
      onPress={onPress}
      label={<Image source={require('../../telegram.png')} style={{width: 50 , height: 50}} />}
 />
  
    </View>

  )
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
  },
  todoInp: {
    borderBottomWidth: 1,
    width: 230,
    borderBottomColor: 'black',
  },
  addTodo: {
    width: 70,
    marginTop: 20,
  },
  txt: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'purple'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    width: 60,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'purple',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  cancelBtn: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: 'purple',
    marginLeft: 10
  },
  modalFlex: {
    display: 'flex',
    flexDirection: 'row',
  }

})
export default AddTodo;
