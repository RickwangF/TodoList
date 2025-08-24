import { useState } from "react";
import "./App.css"

class TodoItem {
    constructor(content, date) {
        this.id = Date.now().toString(); // 用时间戳生成唯一 id
        this.content = content;          // 待办事项内容
        this.date = date || new Date();  // 默认是当前日期
    }
}

export default function TodoList() {
    // 使用useState 生成一个todolist的数组
    const [todos, setTodos] = useState([])
    const [inputValue, setInputValue] = useState("")

    function  addToDo(text) {
        const list = todos.slice()
        const newTodoItem = new TodoItem(text, Date.now())
        list.push(newTodoItem)
        setTodos(list)
    }

    function handleDeleteButtonClicked(id) {
        let newTodos = todos.slice()
        newTodos = newTodos.filter( (item) => {
            return  item.id !== id
        })
        setTodos(newTodos)
    }

    function handleButtonClicked() {
        if (inputValue.length === 0) {
            return
        }
        addToDo(inputValue)
        setInputValue("")
    }

    const listItems = todos.map( (todo) => {
        return (
            <li key={todo.id}>
                {todo.content}
                <button onClick={ (e) => { handleDeleteButtonClicked(todo.id) } }>删除</button>
            </li>
        );
    });

    return(
        <div className="todoList">
            <ul>
                { listItems }
            </ul>
            <div className="textAreaContainer">
                <textarea className="todo-textArea" value={ inputValue } onChange={ (e) => {  setInputValue(e.target.value) } }></textarea>
                <button onClick={ handleButtonClicked }>添加待办</button>
            </div>
        </div>
    );
}
