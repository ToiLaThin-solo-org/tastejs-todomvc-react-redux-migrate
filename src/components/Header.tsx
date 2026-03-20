/* eslint-disable react/react-in-jsx-scope */
import { useTodoDispatch } from '../hooks/useTodoDispatch';
import TextInput from './TextInput';

export default function Header() {
    const todoDispatch = useTodoDispatch();

    const handleSave = function (text: string): void {
        todoDispatch({ type: 'Add', text: text });
    };

    return (
        <header className="header">
            <h1>todos</h1>
            <TextInput isEditMode={false} placeholder="What needs to be done?" onSave={handleSave} />
        </header>
    );
}
