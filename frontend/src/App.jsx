import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // [GET] 목록 불러오기
  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  useEffect(() => { fetchTodos(); }, []);

  // [POST] 할 일 추가
  const addTodo = async () => {
    if (!input.trim()) return;
    await axios.post(API_URL, { title: input });
    setInput("");
    fetchTodos();
  };

  // [PUT] 완료 여부 체크 (토글)
  const toggleTodo = async (id, completed) => {
    await axios.put(`${API_URL}/${id}`, { completed: !completed });
    fetchTodos();
  };

  // [DELETE] 삭제
  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">My Todo List</h1>
      
      <div className="flex gap-2 mb-8 w-full max-w-md">
        <input 
          className="flex-1 p-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 입력하세요..."
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600">추가</button>
      </div>

      <div className="w-full max-w-md space-y-3">
        {todos.map(todo => (
          <div key={todo._id} className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center group">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleTodo(todo._id, todo.completed)}>
              <input type="checkbox" checked={todo.completed} readOnly className="w-5 h-5 accent-blue-500" />
              <span className={`text-lg ${todo.completed ? "line-through text-gray-400" : "text-gray-700"}`}>{todo.title}</span>
            </div>
            <button onClick={() => deleteTodo(todo._id)} className="text-red-400 hover:text-red-600 font-bold opacity-0 group-hover:opacity-100 transition">삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;