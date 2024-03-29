import { Outlet } from 'react-router-dom'

const Todo = () => {
  return (
    <>
          <div className="w-80 py-5 bg-info opacity-85">
              <div className="container w-50 p-3 mb-2 bg-white">
                  <h1 className="fw-bold text-center">TODOLIST</h1>
                  <Outlet />
              </div>
          </div>
    </>
  )
}

export default Todo