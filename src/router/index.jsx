import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ListTodo from '../component/ListTodo'
import UpdateTodo from '../component/UpdateTodo'
import AddTodo from '../component/AddTodo'
import Todo from '../page/Todo'

const Routers = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
    };
    return (
        <>
            <Routes>
                <Route path="/" element={<Todo />}>
                    <Route index element={<ListTodo />} />
                    <Route path="update/:id" element={<UpdateTodo />} />
                    <Route path="add" element={<AddTodo addTodo={addTodo} />} />
                </Route>
            </Routes>
        </>
    )
}

export default Routers