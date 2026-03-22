import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '@/components/Header/Header';
import TodoList from '@/components/TodoList/TodoList';
import TodoProvider from '@/contexts/TodoContext';
import { Footer } from '@/components/Footer/Footer';

export default function App() {
    const TodoApp = (
        <TodoProvider>
            <Header></Header>
            <TodoList></TodoList>
            <Footer></Footer>
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
