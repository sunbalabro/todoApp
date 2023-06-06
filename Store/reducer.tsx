import { createSlice  , PayloadAction} from "@reduxjs/toolkit";


interface Todo{
    todoValue: string,
    id: string,
    checked: boolean
}
interface Todos{
    todos: Todo[]
}
interface PayloadValues{
    todoValue: string,
    id: string,
    checked: boolean
}
const initialState: Todos ={
    todos: []
}

const TodoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers:{
       addTodos: (state , action:PayloadAction<Todo>)=>{
            state.todos.push(action.payload)
       },
       deleteTodo: (state , action:PayloadAction<string>)=>{
          state.todos = state.todos.filter(todo => todo.id !== action.payload)
       },
       completeTodo: (state, action: PayloadAction<string>) => {
        const todo = state.todos.find((todo) => todo.id === action.payload);
        if (todo) {
          todo.checked = !todo.checked
        }
      },
      editTodo: (state , action) =>{
        const todo = state.todos.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.todoValue = action.payload.value
        }
      }
    }
})
export const { addTodos, deleteTodo, completeTodo , editTodo} = TodoSlice.actions;
export default TodoSlice.reducer;