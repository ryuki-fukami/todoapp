import { useState } from 'react';
import { Todo } from '../types/Todo';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from "react-datepicker"
import ja from 'date-fns/locale/ja';
import { format } from 'date-fns';

type Props = {
  todo: Todo;
  onSubmit: (todo: Todo) => void;
};

const TodoFormInline = ({ todo, onSubmit }: Props) => {
  const [newTodo, setNewTodo] = useState<Todo>({ ...todo });
  const [oldTodo, setOldTodo] = useState<Todo>({ ...todo });
  const Today = new Date();
  registerLocale('ja', ja);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  const handleDateChange = (date: Date) => {
    setNewTodo({
      ...newTodo,
      deadline: date.toISOString(),
    });
  };

  const handleUpdate = () => {
    onSubmit(newTodo);
    setOldTodo({ ...newTodo });
  };

  const handleCancel = () => {
    onSubmit(oldTodo);
  };

  return (
    <tr className='edit_text edit_td'>
      <td>
        <label>{format(new Date(newTodo.date),'yyyy/MM/dd')}</label>
        <input type="hidden" name="date" value={newTodo.date} onChange={handleChange} />
      </td>
      <td>
        <input type="text" name="name" value={newTodo.name} onChange={handleChange} />
      </td>
      <td>
        <input type="text" name="detail" value={newTodo.detail} onChange={handleChange} />
      </td>
      <td>
        <select name="status" value={newTodo.status} onChange={handleChange}>
          <option value="未着手">未着手</option>
          <option value="着手中">着手中</option>
          <option value="完了">完了</option>
        </select>
      </td>
      <td>
        <DatePicker name="deadline" selected={new Date(newTodo.deadline)} dateFormat="yyyy/MM/dd" locale='ja' minDate={Today} onChange={handleDateChange} />
      </td>
      <td className='width15'>
        <button className='common_btn' onClick={handleUpdate}>更新</button>
        <button className='common_btn' onClick={handleCancel}>キャンセル</button>
      </td>
    </tr>
  );
};

export default TodoFormInline;
