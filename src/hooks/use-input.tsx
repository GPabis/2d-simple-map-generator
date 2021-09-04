import { useState } from 'react';

const useInput = (minimum: number, defaultValue: number) => {
    const [enteredValue, setEnteredValue] = useState(defaultValue);

    const valueChangedHandler = (event: React.FormEvent<HTMLInputElement>) => {
        const value = +event.currentTarget.value;
        setEnteredValue(value);
    }

    return {
        enteredValue,
        valueChangedHandler,
    }
}

export default useInput;