import {
    FormControl,
    FormLabel,
    Stack,
    Box,
    Text
} from '@chakra-ui/core';

import './GuessHistory.css';

function GuessHistory(props) {
    // Build a list of guesses (latest one is already at the top)
    const history = props.guessList.map(guess => {
        const correctDigits = [];

        for (let i = 0; i < 4; i++) {
            if (guess.charAt(i) === props.answer.charAt(i)) {
                // Match on same index, add a plus
                correctDigits.push('+');
            } else if (props.answer.includes(guess.charAt(i))) {
                // Match on different index, add a minus
                correctDigits.push('-');
            }
        }

        return (
            <Box key={guess + 'key'} className='Box' shadow='md'>
                <Text>{guess}</Text>
                <Text>{correctDigits.join('')}</Text>
            </Box>
        );
    });

    return (
        // Don't show label unless there is a guess
        props.guessList.length > 0 &&
        <FormControl mt={2}>
            <FormLabel htmlFor='previousGuesses'>Önceki Tahminler</FormLabel>
            <Stack className='Stack'>{history}</Stack>
        </FormControl>
    );
}

export default GuessHistory;
