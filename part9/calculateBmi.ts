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
    throw new Error('could not calculate bmi');
};

export default calculateBmi;
