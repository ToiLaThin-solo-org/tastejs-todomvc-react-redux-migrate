import { useState } from 'react';
import { useTodoDispatch } from '@/hooks/useTodoDispatch';
import { Todo } from '@/types/Todo';
import TextInput from '@/components/TextInput/TextInput';
import { TodoActionType } from '@/contexts/TodoContext';

export default function TodoItem({ todo }: Readonly<{ todo: Todo }>) {
    const [isEditing, setIsEditing] = useState(false); //which ever component have this isEditing state should have conditional render
    const todoDispatch = useTodoDispatch();

    const handleSave = (id: number, text: string) => {
        if (text.length === 0) {
            todoDispatch({ type: TodoActionType.Delete, id: id });
        } else {
            todoDispatch({ type: TodoActionType.Edit, id: id, todo: { text: text } });
        }
        setIsEditing(false);
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    return (
        <li data-testid="todo-item">
            {isEditing ? (
                <TextInput isEditMode={true} placeholder="" onSave={(text) => handleSave(todo.id, text)}></TextInput>
            ) : (
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => todoDispatch({ type: TodoActionType.ToggleCompleteTodo, id: todo.id })}
                        data-testid="todo-item-toggle"
                    />
                    <label onDoubleClick={handleDoubleClick} data-testid="todo-item-label">
                        {todo.text}
                    </label>
                    <button
                        className="destroy"
                        onClick={() => todoDispatch({ type: TodoActionType.Delete, id: todo.id })}
                        data-testid="todo-item-button"
                    />
                </div>
            )}
        </li>
    );
}
