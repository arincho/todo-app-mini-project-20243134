import { useState, useEffect } from 'react';
import axios from 'axios';

// 백엔드 서버 주소
const API_URL = "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // 1. [GET] 서버에서 데이터 불러오기
  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (err) {
      console.error("데이터 로딩 실패:", err);
    }
  };

  // 앱이 처음 켜질 때 데이터를 가져옴
  useEffect(() => {
    fetchTodos();
  }, []);

  // 2. [POST] 데이터 추가하기
  const addTodo = async () => {
    if (!input.trim()) return;
    try {
      await axios.post(API_URL, { title: input });
      setInput("");
      fetchTodos(); // 추가 후 목록 새로고침
    } catch (err) {
      alert("추가 실패! 백엔드 서버를 확인하세요.");
    }
  };

  // 3. [DELETE] 데이터 삭제하기
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos(); // 삭제 후 목록 새로고침
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>My Todo List (Real DB)</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 입력하세요"
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>추가</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo._id} style={{ marginBottom: '10px', borderBottom: '1:px solid #eee', padding: '5px' }}>
            {todo.title}
            <button onClick={() => deleteTodo(todo._id)} style={{ marginLeft: '10px', color: 'red' }}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;