import calculateBmi from './calculateBmi';

const parseArguments = (args: string[]) => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const height = Number(args[2]);
    const weight = Number(args[3]);
    if (isNaN(height) || isNaN(weight)) {
        throw new Error('Provided values were not numbers!');
    } else {
        return { height, weight };
    }
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
