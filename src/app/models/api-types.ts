export interface IQuestions {
    questions: IQuestionOption[];
}

export interface IQuestionOption {
    questionText: string;
    options: IQOption[];
    explanation: string;
    disabled?:boolean;
}

export interface IQOption {
    text: string;
    correct: boolean;
    selected?: boolean;
}
