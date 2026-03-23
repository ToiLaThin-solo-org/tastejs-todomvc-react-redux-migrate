import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '@/components/Header/Header';
import Main from '@/components/Main/Main';
import TodoProvider from '@/contexts/TodoContext';
import '@/styles/app.css';

export default function App() {
    const TodoApp = (
        <TodoProvider>
            <Header></Header>
            <Main></Main>
        </TodoProvider>
    );
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={TodoApp} />
            </Routes>
        </BrowserRouter>
    );
}
