import React, { useEffect, useState } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import { Todo } from '../types/Todo';


const IndexPage = (props: Todo[] | (() => Todo[])) => {
  
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodoList();
  }, []);

  // todo一覧取得
  const getTodoList = async () => {
    const res = await fetch('http://127.0.0.1:5000/todolist');
    const data = await res.json();
    if (data.data) {
      const todos = data.data.map((todo: any) => ({
        id: todo.id.toString(),
        date: todo.input_date,
        name: todo.todo_name,
        detail: todo.todo_detail,
        deadline: todo.deadline,
        status: todo.status,
      }));      
      setTodos(todos);
    } else {
      console.error('一覧取得失敗');
    }    
  };

  // todo追加
  const addTodo = async (todo: Todo) => {
    const res = await fetch('http://localhost:5000/addtodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });
    const data = await res.json();
    if (data.data) {
      getTodoList();
      
    } else {
      console.error('追加失敗');
    }
  };

  // todo更新
  const updateTodo = async (todo: Todo) => {
      const res = await fetch('http://localhost:5000/updatetodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });
    const data = await res.json();
    if (data.data) {
      getTodoList();
      
    } else {
      console.error('更新失敗');
    }
  };

  // todo削除
  const deleteTodo = async (todo: Todo) => {
      const res = await fetch('http://localhost:5000/deletetodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });
    const data = await res.json();
    if (data.data) {
      getTodoList();
      
    } else {
      console.error('削除失敗');
    }
  };

  return (
    
    <div>

      <div>
        <TodoForm onAddTodo={addTodo} />      
      </div>
      <div>
        <TodoList todos={todos} onUpdateTodo={updateTodo} onDeleteTodo={deleteTodo} /> 
      </div>
    </div>
  );
};

export default IndexPage;