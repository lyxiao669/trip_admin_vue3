interface Question {
  id: number;
  timestamp: string;
  problem: string;
  type: number;
  img: string;
  answerAnalysis: string;
  createTime: string;
  keyWord: string;
}

interface QuestionOption {
  id: number;
  timestamp: string;
  questionId: number;
  option: string;
  optionsAnswer: string;
  isAnswer: boolean;
  createTime: string;
}

interface QuestionBank {
  id: number;
  timestamp: string;
  title: string;
  grade: string;
  timeLimit: number;
  amount: number;
  multipleChoiceAmount: number;
  trueOrFalseAmount: number;
  createTime: string;
}