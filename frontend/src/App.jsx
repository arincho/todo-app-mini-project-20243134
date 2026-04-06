import { useState, useEffect } from 'react';
import axios from 'axios';

// 백엔드 주소 (로컬 테스트용)
// 배포 시에는 백엔드도 배포된 주소로 바꿔야 하지만, 
// 현재 상태에서는 로컬 서버가 켜져 있을 때 이 주소로 통신합니다.
const API_URL = "http://localhost:5000/api/todos";

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
      fetchTodos(); // 추가 후 목록 갱신
    } catch (err) {
      console.error("추가 실패:", err);
    }
  };

  // 3. [DELETE] 할 일 삭제하기
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos(); // 삭제 후 목록 갱신
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

  return (
    // 1. 전체 위치를 상단 중앙으로 조정 (h-screen 제거 -> min-h-screen, items-center 제거 -> py-16)
    <div className="min-h-screen bg-blue-50 py-16 px-6 font-sans flex justify-center">
      
      {/* 2. 전체 크기를 대폭 확대 (max-w-2xl -> max-w-7xl) */}
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl p-12">
        
        {/* 3. 제목 크기 키움 (text-4xl -> text-5xl) */}
        <h1 className="text-5xl font-extrabold text-center text-blue-600 mb-16 tracking-tight">
          My Todo List
        </h1>
        
        {/* 4. 입력 섹션 크기 키움 (p-5 -> p-6) */}
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

        {/* 5. 할 일 목록 섹션 */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {todos.length === 0 ? (
            <p className="text-center text-gray-400 py-20 text-xl">할 일이 없습니다. 즐거운 하루 되세요! ☀️</p>
          ) : (
            todos.map(todo => (
              // 6. 삭제 위치 조정 (w-full, flex, justify-between)
              <div 
                key={todo._id} 
                className="w-full flex items-center justify-between bg-white border border-gray-100 p-7 rounded-3xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                {/* 왼쪽: 아이콘과 글자 */}
                <div className="flex items-center gap-6">
                  <div className="w-3 h-14 bg-blue-300 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                  {/* 글자 크기 키움 (text-xl -> text-2xl) */}
                  <span className="text-2xl font-medium text-gray-800">{todo.title}</span>
                </div>
                
                {/* 오른쪽: 삭제 버튼 (이전과 동일한 디자인에 flex 추가) */}
                <div className="flex-shrink-0"> {/* 버튼이 찌그러지지 않게 설정 */}
                  <button 
                    onClick={() => deleteTodo(todo._id)} 
                    className="flex items-center gap-2.5 bg-red-50 text-red-500 px-6 py-4 rounded-full font-semibold text-xl hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm"
                    title="삭제"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>삭제</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 7. 하단 푸터 (학번/이름 표시) */}
        <div className="mt-20 pt-10 border-t border-gray-100 text-center">
          <p className="text-lg text-gray-400 font-medium">학번: 20243134 | todo-app 미니 프로젝트</p>
        </div>
      </div>
    </div>
  );
}

export default App;