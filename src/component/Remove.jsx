import { useState } from "react";

const Remove = () => {
    const [checkedItems, setCheckedItems] = useState([]);
    const removeChecked = (item) => {
        // setTodos(todos.map(item => {
        //     if (item.isCompleted) {
        //         return { ...item, isCompleted: false };
        //     }
        //     return item;
        // }));
        const remainingTasks = checkedItems.filter(task => !task.checkedItems[item.id]);
        setCheckedItems(remainingTasks);

        if (remainingTasks.length === 0) {
            console.log('none');
            return 'none';
        }
    };

    return (
        <div className="row">
            <div className="col">
                <div className="text-center py-2 bg-warning">
                    1 of 2 tasks done
                </div>
            </div>
            <div className="col">
                <button
                    type="submit"
                    onClick={removeChecked}
                    className="text-center w-100 border border-primary py-2 bg-primary opacity-75 text-light"
                >
                    Remove checked <span className="fw-bolder">X</span>
                </button>
            </div>
        </div>
    );
};

export default Remove;

