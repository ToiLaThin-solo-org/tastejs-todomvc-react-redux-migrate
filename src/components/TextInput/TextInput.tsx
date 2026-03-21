import React, { useState } from 'react';

//This should be dumb component to reuse the logic for Header and TextInput
//isEditMode to distinguish the component used in Header or TextInput => behavious when blur/enter change
export type TextInputProps = {
    placeholder: string;
    isEditMode: boolean;
    onSave: (title: string) => void;
};

export default function TextInput(props: Readonly<TextInputProps>) {
    const [text, setText] = useState('');

    //#region Handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setText(text);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code !== 'Enter') {
            return;
        }
        const text = (e.target as HTMLInputElement).value.trim();
        if (!text) {
            return;
        }
        props.onSave(text);
        if (!props.isEditMode) {
            setText('');
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!props.isEditMode) {
            return;
        }
        const text = e.target.value.trim();
        if (!text) {
            return;
        }
        props.onSave(text);
    };
    //#endregion

    return (
        <input
            data-testid="text-input-component"
            className={props.isEditMode ? 'edit' : 'new-todo'}
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
