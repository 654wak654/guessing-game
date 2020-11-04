import {useState, useRef} from 'react';
import {
    ThemeProvider,
    theme,
    Box,
    Heading,
    Divider,
    Button,
    Collapse,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/core';

import './App.css';
import {default as GuessInput} from './components/GuessInput';
import {default as GuessHistory} from './components/GuessHistory';

function App() {
    const [answer, setAnswer] = useState('');
    const [guess, setGuess] = useState('');
    const [guessList, setGuessList] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const dialogCancelRef = useRef();

    const closeDialog = () => setDialogOpen(false);

    function onStartButton() {
        if (answer === '') {
            // Start game if answer is empty
            setAnswer(generateAnswer());
        } else {
            // Make user confirm restart
            setDialogOpen(true);
        }
    }

    function restart() {
        // Reset state
        setGuess('');
        setGuessList([]);

        // Get a new answer
        setAnswer(generateAnswer());

        closeDialog();
    }

    // Return true if guess was added to guessList, false if otherwise
    function addGuess() {
        if (guessList.includes(guess)) {
            return false;
        }

        // Add to the top of the list, let GuessHistory handle the +/- part
        setGuessList([guess, ...guessList]);

        return true;
    }

    return (
        <ThemeProvider theme={theme}>
            <div className='App'>
                <Box className='Container'>
                    <Heading>Tahmin Oyunu</Heading>
                    <Divider />

                    <Button onClick={onStartButton} variantColor='blue'>
                        {answer === '' ? 'Yeni Oyun' : 'Baştan Başlat'}
                    </Button>

                    <Collapse isOpen={answer !== ''} p={2}>
                        <GuessInput guess={guess} setGuess={setGuess} addGuess={addGuess}></GuessInput>
                        <GuessHistory guessList={guessList} answer={answer}></GuessHistory>
                    </Collapse>
                </Box>
            </div>

            <AlertDialog
                isOpen={dialogOpen}
                leastDestructiveRef={dialogCancelRef}
                onClose={closeDialog}
                blockScrollOnMount={false}
                isCentered={true}
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>Baştan Başlat</AlertDialogHeader>
                    <AlertDialogBody>Oyunu baştan başlatmak istediğine emin misin?</AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={dialogCancelRef} onClick={closeDialog}>İptal</Button>
                        <Button variantColor='red' onClick={restart} ml={3}>Baştan Başlat</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Modal
                isOpen={guessList[0] === answer}
                onClose={restart}
                blockScrollOnMount={false}
                isCentered={true}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Doğru Cevap!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Doğru sayıyı ({answer}) buldun, tebrikler!</ModalBody>

                    <ModalFooter>
                        <Button variantColor='blue' onClick={restart}>Baştan Başlat</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ThemeProvider>
    );
}

// Returns a string of 4 unique numbers
function generateAnswer() {
    // Create an array of all numbers from 0..9
    const numbers = [...Array(10).keys()];

    // Shuffle this array using the fisher-yates shuffle algorithm
    // Using this method gives better randomness
    for (let i = numbers.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const temp = numbers[i];
        numbers[i] = numbers[randomIndex];
        numbers[randomIndex] = temp;
    }

    // Get the first 4 as a string
    const answer = numbers.slice(0, 4).join('');

    console.log('Answer is', answer);

    return answer;
}

export default App;
