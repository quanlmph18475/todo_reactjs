import { useState } from 'react';

const AddTodo = ({ addTodo }) => {
    const [todos, setTodos] = useState({ name: '' });

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setTodos((prevTodo) => ({ ...prevTodo, [name]: value }));
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todos)
        })
            .then(response => {
                if (response.ok) {
                    addTodo(todos);
                    setTodos({ name: '' });
                    alert('Bạn đã thêm thành công');
                } else {
                    console.error('Lỗi khi thêm todo');
                }
            })
            .catch(error => {
                console.error('Lỗi kết nối:', error);
            });
    };

    return (
        <>
            <div className="row-12 d-flex justify-content-center">
                <form onSubmit={onHandleSubmit}>
                    <input
                        type="text"
                        onChange={onHandleChange}
                        name="name"
                        value={todos.name}
                        className="py-2 px-5 border border-warning text-primary text-center"
                    />
                    <button type="submit" className="btn btn-primary border border-primary justify-content-end py-2 px-3 opacity-75 text-light">
                        +
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddTodo;