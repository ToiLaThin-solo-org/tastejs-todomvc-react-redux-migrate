import React, { useState } from 'react';

//This should be dumb component to reuse the logic for Header and TextInput
//isEditMode to distinguish the component used in Header or TextInput => behavious when blur/enter change
type TextInputProps = {
    placeholder: string;
    isEditMode: boolean;
    onSave: (title: string) => void;
};

export default function TextInput(props: Readonly<TextInputProps>) {
    const [text, setText] = useState('');

    //#region Handlers
    const handleChange = (e: React.ChangeEvent) => {
        const text = (e.target as HTMLInputElement).value.trim();
        setText(text);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        const text = (e.target as HTMLInputElement).value.trim();
        if (e.code !== 'Enter' || !text) {
            return;
        }
        props.onSave(text);
        if (!props.isEditMode) {
            setText("");
        }
    };

    const handleBlur = (e: React.FocusEvent) => {
        const text = (e.target as HTMLInputElement).value.trim();
        if (!props.isEditMode || !text) {
            return;
        }
        props.onSave(text);
    }
    //#endregion

    return (
        <input
            className={props.isEditMode ? "edit" : "new-todo"} 
            type="text"
            value={text}
            placeholder={props.placeholder}
            autoFocus
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
        />
    );
}
