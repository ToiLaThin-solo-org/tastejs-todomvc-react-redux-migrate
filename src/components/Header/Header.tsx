import { useTodoDispatch } from '@/hooks/useTodoDispatch';
import TextInput from '@/components/TextInput/TextInput';
import { TodoActionType } from '@/contexts/TodoContext';

export default function Header() {
    const todoDispatch = useTodoDispatch();

    const handleSave = function (text: string): void {
        todoDispatch({ type: TodoActionType.Add, text: text });
    };

    return (
        <header className="header" data-testid="header">
            <h1>todos</h1>
            <TextInput isEditMode={false} placeholder="What needs to be done?" onSave={handleSave} />
        </header>
    );
}
