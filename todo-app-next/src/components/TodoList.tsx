import { useState, useEffect } from 'react';
import { Todo } from '../types/Todo';
import { format } from 'date-fns';
import TodoEditLine from './TodoEditLine';


type TodoListProps = {
  todos: Todo[];
  onDeleteTodo: (todo: Todo) => void;
  onUpdateTodo: (todo: Todo) => void;
};

const TodoList = ({ todos, onDeleteTodo, onUpdateTodo }: TodoListProps) => {
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  const handleDeleteTodo = (todo: Todo) => {
    onDeleteTodo(todo);
  };

  const handleUpdateTodo = (todo: Todo) => {
    onUpdateTodo(todo);
    setEditTodo(null);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditTodo(todo);
  };
  

  const downloadCSV = () => {
    const csv = todos.map((todo) => {
      const row = [todo.id,todo.date, todo.name, todo.detail, todo.status, todo.deadline];
      return row.map((cell) => `"${cell}"`).join(',');
    }).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'todos.csv';
    link.click();

    URL.revokeObjectURL(url);
  };


  return (
    <div className='mb30'>
        <table className='ml10'>
            <thead>
                <tr>
                    <th className='width10'>入力日時</th>
                    <th className='width15'>タスク名</th>
                    <th className='width15'>タスク詳細</th>
                    <th className='width10'>ステータス</th>
                    <th className='width10'>期限</th>
                    <th className='width15'></th>
                </tr>
            </thead>
            <tbody>
                {todos.map((todo) => editTodo?.id === todo.id ? (
                    <TodoEditLine key={todo.id} todo={todo} onSubmit={(updatedTodo) => handleUpdateTodo(updatedTodo)} />
                ) : (
                    <tr key={todo.id}>
                        <td>{format(new Date(todo.date), 'yyyy/MM/dd')}</td>
                        <td>{todo.name}</td>
                        <td>{todo.detail}</td>
                        <td>{todo.status}</td>
                        <td>{format(new Date(todo.deadline), 'yyyy/MM/dd')}</td>
                        <td>
                            <button className='common_btn' onClick={() => handleEditTodo(todo)}>編集</button>
                            <button className='common_btn' onClick={() => handleDeleteTodo(todo)}>削除</button>
                        </td>
                    </tr>
                )
                )}
            </tbody>
        </table>
    </div>
  );
};

export default TodoList;
