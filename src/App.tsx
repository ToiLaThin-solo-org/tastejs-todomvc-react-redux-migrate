import React from 'react';
import Header from './components/Header/Header';
import TodoList from './components/TodoList';
import TodoProvider from './contexts/TodoContext';

export default function App() {
    return (
        <TodoProvider>
            <Header></Header>
            <TodoList></TodoList>
        </TodoProvider>
    );
}
