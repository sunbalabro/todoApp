import React, { FC, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store/store';
import { completeTodo, deleteTodo, editTodo } from '../../Store/reducer';
import Checkbox from 'expo-checkbox';

interface Todo {
  todoValue: string,
  id: string,
  checked: boolean
}
interface Todos {
  todos: Todo[]
}
const ListOfTodos: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.todos.todos)
  const [completeTask, setCompleteTask] = useState(false)
  const [editId, setEditId] = useState('')
  const [newVal, setNewVal] = useState('')
  const { container, todoItem, todoText, todoBtn, btnText, extra, completetodoText, comtodoBtn, cancelBtn, modalFlex } = styles

  const handleDelete = (e: any) => {
    const todoId = e.id
    dispatch(deleteTodo(todoId))
  }
  const handleCheck = (id: string) => {
    dispatch(completeTodo(id))
    setCompleteTask(!completeTask)
  }
  const handleEdit = (id: string) => {
    setEditId(id)
    setModalVisible(true)
  }
  const handleEditVal = (e: string) => {
    setNewVal(e)
  }
  const handleModalClose = () => {
    if (newVal.length !== 0) {
      const editItem = {
        id: editId,
        value: newVal
      }
      dispatch(editTodo(editItem))
      setModalVisible(!modalVisible)
    } else {
      setModalVisible(!modalVisible)
    }

  }
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
            <Text style={styles.modalText}>Change Your value</Text>
            <TextInput placeholder='Write your new value' onChangeText={handleEditVal} style={{ borderBottomColor: 'purple', borderBottomWidth: 1, marginBottom: 10 }}></TextInput>
            <View style={modalFlex}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleModalClose()}>
                <Text style={styles.textStyle}>Ok</Text>
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
      {
        todos?.length !== 0 ? (todos.map((todo: Todo) => (

          <View style={todoItem} key={todo.id}>
            <Checkbox
              value={todo.checked}
              onValueChange={() => handleCheck(todo.id)}
              color={todo.checked ? "#4630EB" : "none"}
              style={{ marginTop: 13 }}
              id={todo.id}
            />
            <View style={{flexWrap: 'wrap'}}>
<Text style={{
              fontSize: 16,
              color: 'black',
              marginTop: 8,
              textDecorationLine: todo.checked ? 'line-through' : 'none', 
              textDecorationColor: todo.checked ? 'purple' : '#fff',
            }} numberOfLines={2} ellipsizeMode="tail">{todo.todoValue}</Text>
            </View>

            
            <TouchableOpacity style={todo.checked ? comtodoBtn : todoBtn} onPress={() => handleDelete(todo)} disabled={todo.checked}><Text style={btnText}>Delete</Text></TouchableOpacity>
            <TouchableOpacity style={todo.checked ? comtodoBtn : todoBtn} onPress={() => handleEdit(todo.id)} disabled={todo.checked}><Text style={btnText}>Update</Text></TouchableOpacity>
          </View>

        )))
          : (
            <Text style={extra}></Text>
          )
      }
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoItem: {
    display: 'flex',
    flexDirection: 'row',
    width: 300,
    height: 70,
    padding: 10,
    justifyContent: 'space-around',
    marginTop: 10,
    backgroundColor: "lilinear-gradient(100deg, rgba(228,103,230,0.4962359943977591) 0%, rgba(222,126,235,0.2805497198879552) 0%, rgba(221,110,240,0.48503151260504207) 89%near-gradient(100deg, rgba(255,255,255,1) 0%, rgba(222,126,235,0.2805497198879552) 0%, rgba(221,110,240,0.48503151260504207) 89%)",
    borderRadius: 50,
    borderBottomRightRadius: 100,
    borderTopRightRadius: 70,
    borderBottomLeftRadius: 30,
  },
  todoText: {
    fontSize: 20,
    color: 'black',
    marginTop: 8,
  },
  todoBtn: {
    borderWidth: 1,
    borderColor: 'purple',
    backgroundColor: 'purple',
    padding: 8,
    width: 60,
    height: 40,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 13,
  },
  extra: {
    fontSize: 30,
    color: "black",
    fontWeight: 'bold',
    marginTop: 40,
  },
  completetodoText: {
    fontSize: 20,
    color: 'black',
    textDecorationLine: 'line-through',
    textDecorationColor: 'purple',
    marginTop: 8,
  },
  comtodoBtn: {
    borderWidth: 1,
    borderColor: 'purple',
    backgroundColor: 'purple',
    padding: 8,
    width: 60,
    height: 40,
    borderRadius: 10,
    opacity: 0.5
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
export default ListOfTodos;