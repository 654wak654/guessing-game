import {useState} from 'react';
import {
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
} from '@chakra-ui/core';

function GuessInput(props) {
    const [invalid, setInvalid] = useState(false);
    const [duplicate, setDuplicate] = useState(false);

    const onGuessChange = event => props.setGuess(event.target.value);

    function onGuess() {
        // Checks if guess consists only of 4 unique numbers
        const isInvalid =
            props.guess.length !== 4 ||
            !props.guess.match(/[0-9]{4}/) ||
            new Set(props.guess).size !== 4;

        setInvalid(isInvalid);

        if (isInvalid) {
            setDuplicate(false);

            return;
        }

        // Check if guess was already made
        const isDuplicate = !props.addGuess();

        setDuplicate(isDuplicate);

        if (isDuplicate) {
            return;
        }
    }

    function onInputKeyPress(event) {
        if (event.key === 'Enter') {
            onGuess();
        }
    }

    return (
        <FormControl isInvalid={invalid || duplicate}>
            <FormLabel htmlFor='guess'>Tahmin</FormLabel>

            <Flex align='center'>
                <Input mr='1rem' flex='1' value={props.guess} isInvalid={invalid || duplicate} onChange={onGuessChange} onKeyPress={onInputKeyPress}></Input>
                <Button variantColor='green' onClick={onGuess}>Dene</Button>
            </Flex>

            <FormErrorMessage>
                {
                    duplicate
                        ? 'Bu sayıyı zaten denediniz!'
                        : 'Lütfen 4 basamaklı ve her basamağı birbirinden farklı bir sayı kullan (sayı 0 ile de başlayabilir).'
                }
            </FormErrorMessage>
        </FormControl>
    );
}

export default GuessInput;
