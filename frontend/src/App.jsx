import { useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = "/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // 1. [GET] 서버에서 목록 불러오기
  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (err) {
      console.error("데이터 로딩 실패:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 2. [POST] 할 일 추가하기
  const addTodo = async () => {
    if (!input.trim()) return;
    try {
      await axios.post(API_URL, { title: input });
      setInput("");
      fetchTodos(); 
    } catch (err) {
      console.error("추가 실패:", err);
    }
  };

  // 3. [DELETE] 할 일 삭제하기
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos(); 
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

return (
    <div className="min-h-screen bg-blue-50 py-16 px-6 font-sans flex justify-center">
      
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl p-12">
        
        <h1 className="text-5xl font-extrabold text-center text-blue-600 mb-16 tracking-tight">
          My Todo List
        </h1>
        
        <div className="flex gap-5 mb-12 max-w-5xl mx-auto">
          <input 
            className="flex-1 border-2 border-blue-100 rounded-2xl p-6 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-2xl text-gray-700 placeholder:text-gray-300"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="할 일을 입력하세요..."
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <button 
            onClick={addTodo} 
            className="bg-blue-600 text-white px-10 py-6 rounded-2xl font-bold text-2xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200"
          >
            추가
          </button>
        </div>

        <div className="space-y-6 max-w-5xl mx-auto">
          {todos.length === 0 ? (
            <p className="text-center text-gray-400 py-20 text-xl">할 일이 없습니다. 즐거운 하루 되세요! ☀️</p>
          ) : (
            todos.map(todo => (
              <div 
                key={todo._id} 
                className="w-full flex items-center justify-between bg-white border border-gray-100 p-7 rounded-3xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-3 h-14 bg-blue-300 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                  <span className="text-2xl font-medium text-gray-800">{todo.title}</span>
                </div>
                
                <div className="flex-shrink-0">
                  <button 
                    onClick={() => deleteTodo(todo._id)} 
                    className="flex items-center justify-center bg-red-50 text-red-500 w-24 h-14 rounded-xl font-semibold text-xl hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm"
                    title="삭제"
                  >
                    
                    <span className="leading-none">삭제</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-20 pt-10 border-t border-gray-100 text-center">
          <p className="text-lg text-gray-400 font-medium">학번: 20243134 | todo-app 미니 프로젝트</p>
        </div>
      </div>
    </div>
  );
}

export default App;