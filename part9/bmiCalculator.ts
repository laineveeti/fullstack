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

const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / (height / 100) ** 2;
    if (bmi < 16) {
        return 'Underweight (severe thinness)';
    }
    if (bmi >= 16 && bmi < 16.9) {
        return 'Underweight (moderate thinness)';
    }
    if (bmi >= 16.9 && bmi < 18.4) {
        return 'Underweight (mild thinness)';
    }
    if (bmi >= 18.4 && bmi < 24.9) {
        return 'Normal (healthy weight)';
    }
    if (bmi >= 24.9 && bmi < 29.9) {
        return 'Overweight';
    }
    if (bmi >= 29.9 && bmi < 34.9) {
        return 'Obese (Class I)';
    }
    if (bmi >= 34.9 && bmi < 39.9) {
        return 'Obese (Class II)';
    }
    if (bmi >= 39.9) {
        return 'Obese (Class III)';
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
