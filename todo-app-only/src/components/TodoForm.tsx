import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Todo } from '../types/Todo';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from "react-datepicker"
import ja from 'date-fns/locale/ja';
import { format } from 'date-fns';

interface TodoFormProps {
  onAddTodo: (todo: Todo) => void;
}

const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const Today = new Date();
    registerLocale('ja', ja);

  const [todo, setTodo] = useState<Todo>({
    id: '',
    date: format(new Date(), 'yyyy/MM/dd'),
    name: '',
    detail: '',
    status: '未着手',
    deadline: format(new Date(), 'yyyy/MM/dd'),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    onAddTodo({
      ...todo,
      id:  '',
    });
    setTodo({
      id: '',
      date: format(new Date(), 'yyyy/MM/dd'),
      name: '',
      detail: '',
      status: '未着手',
      deadline: format(new Date(), 'yyyy/MM/dd'),
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTodo({
      ...todo,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (date: Date) => {
    setTodo({
      ...todo,
      deadline: date.toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className='mt10 ml10 mb10'>
          <label>タスク名　　：</label>
          <input className='form_name' type="text" name="name" value={todo.name} onChange={handleChange} />
        </div>
        <div className='ml10 mb10'>
          <label>タスク詳細　：</label>
          <input className='form_detail' name="detail" value={todo.detail} onChange={handleChange} />
        </div>
        <div className='ml10 mb10'>
          <label>ステータス　：</label>
          <select className='form_status' name="status" value={todo.status} onChange={handleChange}>
            <option value="未着手">未着手</option>
            <option value="着手中">着手中</option>
          </select>
        </div>
        <div className='ml10 mb10'>
        <label>期限　　　　：</label>
          <DatePicker className='form_deadline'  name="deadline" selected={new Date(todo.deadline)} dateFormat="yyyy/MM/dd" locale='ja' minDate={Today} onChange={handleDateChange} />
          <br />
        </div>
        <div className='ml10 mb10'>
            <button className='common_btn' type="submit">追加</button>
        </div>
    </form>
  );
};

export default TodoForm;