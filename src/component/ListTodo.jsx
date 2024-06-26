import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddTodo from './AddTodo'

const ListTodo = () => {
    const [todos, setTodos] = useState([]);
    const [checkedIds, setCheckedIds] = useState([]);

    const addTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
    };
    useEffect(() => {
        fetch('http://localhost:3000/todos')
            .then((response) => response.json())
            .then((data) => setTodos(data))
    }, [])
    const onHandleRemove = (id) => {
        fetch(`http://localhost:3000/todos/${id}`, {
            method: "DELETE"
        }).then(() => setTodos(todos.filter((todo) => todo.id != id)))
        alert('Bạn đã xóa thành công')
    };
    const handleCheckboxChange = (id) => {
        // const newCheckedIds = todos.includes(id)
        //     ? todos.filter((checkedId) => checkedId !== id)
        //     : [...todos, id];
        // setCheckedIds(newCheckedIds);

        const newTodoList = todos.map((item) => {
            if (item.id == id) {
                return { ...item, done: !item.done };
            }
            return item;

        });
        setTodos(newTodoList);
    };

    const handleChecked = () => {
        // const uncheckedTodos = todos.map((item) => !checkedIds.includes(item.id));
        // setTodos(uncheckedTodos);
        // setCheckedIds([]);
        setTodos(todos.filter(task => !task.done));
    };


    return (
        <>
            <AddTodo addTodo={addTodo} />
            {todos.map((item) => {
                return (
                    <>
                        <div className="row shadow-none p-2 mb-5 bg-light rounded" key={item.id}>
                            <div className="col-5 px-4 d-flex justify-content-start" >


                                <label style={item.done ? { textDecoration: "line-through" } : null}
                                    className="form-check-label text-primary"

                                >
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={item.done}
                                        onChange={() => handleCheckboxChange(item.id)}
                                        readOnly
                                    />
                                    {item.name}
                                </label>
                            </div>


                            <div className="col-6 d-flex justify-content-end">
                                <Link to={`update/${item.id}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="16" height="16" fill="currentColor"
                                        className="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                    </svg>
                                </Link>
                                <Link onClick={() => onHandleRemove(item.id)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
                                        fill="currentColor"
                                        className="bi bi-x-lg"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                    </svg>
                                </Link>

                            </div>
                        </div>
                    </>
                )
            })} <br />
            <div className="row">
                <div className="col">
                    <div className="text-center py-2 bg-warning">
                        {todos.filter((item) => item.done).length} of {todos.length} tasks done
                    </div>
                </div>
                <div className="col">
                    <button
                        type="submit"
                        onClick={handleChecked}
                        className="text-center w-100 border border-primary py-2 bg-primary opacity-75 text-light"
                    >
                        Kiểm tra checked <span className="fw-bolder">X</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default ListTodo