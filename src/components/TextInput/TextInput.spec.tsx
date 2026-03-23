import { render, screen } from '@testing-library/react';
import TextInput, { TextInputProps } from '@/components/TextInput/TextInput';
import userEvent from '@testing-library/user-event';

describe('TextInput component', () => {
    const setupComponent = (props: Partial<TextInputProps> = {}) => {
        const onSave = jest.fn();
        render(<TextInput placeholder="test" onSave={onSave} isEditMode={true} {...props} />);
        const inputElement: HTMLInputElement = screen.getByPlaceholderText('test');
        const user = userEvent.setup();
        return { inputElement, onSave, user };
    };

    type TestCaseType = {
        inputValue: string;
        isEditMode: boolean;
    };
    const validTestCases: (TestCaseType & { mode: string })[] = [
        { inputValue: 'some value', mode: 'edit', isEditMode: true },
        { inputValue: ' Some V@lue123 ', mode: 'edit', isEditMode: true },
        { inputValue: 'some value', mode: 'new', isEditMode: false },
        { inputValue: ' Some V@lue123 ', mode: 'new', isEditMode: false },
    ];

    const emptyOrWhitespaceTestCases: (TestCaseType & { mode: string })[] = [
        { inputValue: '', mode: 'edit', isEditMode: true },
        { inputValue: '  ', mode: 'edit', isEditMode: true },
        { inputValue: '', mode: 'new', isEditMode: false },
        { inputValue: '  ', mode: 'new', isEditMode: false },
    ];
    const validTestCasesEditMode = validTestCases.filter((tc) => tc.isEditMode === true);
    const emptyOrWhitespaceTestCasesEditMode = emptyOrWhitespaceTestCases.filter((tc) => tc.isEditMode === true);

    //#region Change: This test is low-value, nearly test React
    it.each(validTestCases)(
        'should have expected input value on mode $mode when change input',
        async ({ inputValue, isEditMode }: TestCaseType) => {
            const { inputElement, user } = setupComponent({ isEditMode: isEditMode });
            await user.type(inputElement, inputValue);
            expect(inputElement).toHaveValue(inputValue);
        },
    );
    //#endregion

    //#region Enter
    it.each(validTestCases)(
        'should call onSave on pressing Enter in mode $mode with valid inputs',
        async ({ inputValue, isEditMode }: TestCaseType) => {
            const { inputElement, user, onSave } = setupComponent({ isEditMode: isEditMode });
            await user.type(inputElement, `${inputValue}{enter}`);

            expect(onSave).toHaveBeenCalledTimes(1);
            expect(onSave).toHaveBeenCalledWith(`${inputValue.trim()}`);
        },
    );

    it.each(emptyOrWhitespaceTestCases)(
        'should call onSave on pressing Enter in mode $mode with empty/whitespace inputs',
        async ({ inputValue, isEditMode }: TestCaseType) => {
            const { inputElement, user, onSave } = setupComponent({ isEditMode: isEditMode });
            await user.type(inputElement, `${inputValue}{enter}`);

            expect(onSave).toHaveBeenCalledTimes(1);
        },
    );
    //#endregion

    //#region Blur
    it.each(validTestCasesEditMode)(
        'should call onSave with trimmed value on blur',
        async ({ inputValue, isEditMode }: TestCaseType) => {
            const { inputElement, onSave, user } = setupComponent({ isEditMode: isEditMode });

            await user.type(inputElement, inputValue);
            await user.tab();

            expect(onSave).toHaveBeenCalledWith(inputValue.trim());
        },
    );

    it.each(emptyOrWhitespaceTestCasesEditMode)(
        'should NOT call onSave on blur',
        async ({ inputValue, isEditMode }: TestCaseType) => {
            const { inputElement, onSave, user } = setupComponent({ isEditMode: isEditMode });

            if (inputValue === '') {
                await user.clear(inputElement);
            } else {
                await user.type(inputElement, inputValue);
            }
            await user.tab();

            expect(onSave).not.toHaveBeenCalled();
        },
    );

    it.each(validTestCasesEditMode)(
        'should call onSave twice when pressing Enter then blur in edit mode',
        async ({ inputValue, isEditMode }: TestCaseType) => {
            const { inputElement, user, onSave } = setupComponent({ isEditMode: isEditMode });

            await user.type(inputElement, `${inputValue}{enter}`);
            await user.tab();

            expect(onSave).toHaveBeenCalledTimes(2);
        },
    );

    it('should NOT call onSave on blur in mode add', async () => {
        const { inputElement, onSave, user } = setupComponent({ isEditMode: false });

        await user.type(inputElement, 'value');
        await user.tab();

        expect(onSave).not.toHaveBeenCalled();
    });
    //#endregion

    //#region Resets
    it('should call onSave and NOT resets input in edit mode', async () => {
        const { inputElement, onSave, user } = setupComponent({ isEditMode: true });

        await user.type(inputElement, 'value{enter}');

        expect(onSave).toHaveBeenCalledWith('value');
        expect(inputElement).not.toHaveValue('');
    });

    it('should call onSave and resets input in add mode', async () => {
        const { inputElement, onSave, user } = setupComponent({ isEditMode: false });

        await user.type(inputElement, 'value{enter}');

        expect(onSave).toHaveBeenCalledWith('value');
        expect(inputElement).toHaveValue('');
    });
    //#endregion
});
