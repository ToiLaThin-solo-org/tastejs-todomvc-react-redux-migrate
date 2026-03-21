import { useState } from 'react';
import { Todo } from '../types/Todo';
import TextInput from './TextInput/TextInput';
import { useTodoDispatch } from '../hooks/useTodoDispatch';

export default function TodoItem({ todo }: Readonly<{ todo: Todo }>) {
    const [isEditing, setIsEditing] = useState(false); //which ever component have this isEditing state should have conditional render
    const todoDispatch = useTodoDispatch();

    const handleSave = (id: number, text: string) => {
        if (text.length === 0) {
            todoDispatch({ type: 'Delete', id: id });
        } else {
            todoDispatch({ type: 'Edit', id: id, todo: { text: text } });
        }
        setIsEditing(false);
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    return (
        <li>
            {isEditing ? (
                <TextInput isEditMode={true} placeholder="" onSave={(text) => handleSave(todo.id, text)}></TextInput>
            ) : (
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => todoDispatch({ type: 'ToggleComplete', id: todo.id })}
                    />
                    <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
                    <button className="destroy" onClick={() => todoDispatch({ type: 'Delete', id: todo.id })} />
                </div>
            )}
        </li>
    );
}
