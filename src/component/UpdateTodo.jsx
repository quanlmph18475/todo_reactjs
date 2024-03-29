import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateTodo = () => {
    const { id } = useParams();
    const [todos, setTodos] = useState({});
    const [updatedTodo, setUpdatedTodo] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3000/todos/${id}`)
            .then(response => response.json())
            .then(data => setTodos(data))
            .catch(error => console.log(error));
    }, [id]);

    const onUpdate = (dataUpdate) => {
        fetch(`http://localhost:3000/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUpdate)
        })
            .then(response => response.json())
            .then(data => {
                alert('Bạn đã cập nhật thành công')
                console.log('Todo updated successfully:', data);
            })
            .catch(error => console.log(error));
    };

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        const newData = { ...updatedTodo, [name]: value };
        setUpdatedTodo(newData);
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();
        const dataUpdate = { ...updatedTodo, id };
        onUpdate(dataUpdate);
    };

    return (
        <div className="row-12 d-flex justify-content-center">
            <form onSubmit={onHandleSubmit}>
                <input
                    type="text"
                    onChange={onHandleChange}
                    name="name"
                    defaultValue={todos?.name}
                    className="py-2 px-5 border border-warning text-primary text-center"
                />
                <button type="submit" className="btn btn-primary py-2 px-3 opacity-75 text-light">
                    Cập nhật
                </button>
            </form>
        </div>
    );
};

export default UpdateTodo;