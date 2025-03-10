import { create } from 'zustand';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  answerQuestion: (answer: string) => void;
  restartQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  questions: [
    {
      id: 1,
      question: 'Qual é o principal fator para emagrecer de forma saudável?',
      options: ['Dietas restritivas', 'Déficit calórico', 'Suplementos', 'Exercícios intensos'],
      correctAnswer: 'Déficit calórico',
    },
    {
      id: 2,
      question: 'Quantos litros de água são recomendados por dia para uma pessoa adulta?',
      options: ['1L', '2L', '3L', 'Depende do peso e da atividade física'],
      correctAnswer: 'Depende do peso e da atividade física',
    },
    {
      id: 3,
      question: 'O que é metabolismo basal?',
      options: [
        'Queima calórica em repouso',
        'Gasto calórico durante exercícios',
        'Digestão de proteínas',
        'Processo de construção muscular',
      ],
      correctAnswer: 'Queima calórica em repouso',
    },
    {
      id: 4,
      question: 'Qual é a importância das proteínas no processo de emagrecimento?',
      options: [
        'Aumentam a fome',
        'Ajudam a manter a massa muscular',
        'São a principal fonte de energia',
        'Não têm impacto no emagrecimento',
      ],
      correctAnswer: 'Ajudam a manter a massa muscular',
    },
    {
      id: 5,
      question: 'Qual é o papel dos carboidratos no emagrecimento?',
      options: [
        'Devem ser completamente eliminados',
        'São essenciais para fornecer energia',
        'Aumentam o acúmulo de gordura',
        'Não têm nenhuma função importante',
      ],
      correctAnswer: 'São essenciais para fornecer energia',
    },
    {
      id: 6,
      question: 'Qual é a melhor estratégia para perder peso a longo prazo?',
      options: [
        'Dietas radicais',
        'Mudanças graduais nos hábitos alimentares',
        'Pular refeições',
        'Consumir apenas líquidos',
      ],
      correctAnswer: 'Mudanças graduais nos hábitos alimentares',
    },
    {
      id: 7,
      question: 'Qual é o impacto do sono no processo de emagrecimento?',
      options: [
        'Não tem impacto',
        'Dormir pouco aumenta a fome',
        'Dormir muito acelera o metabolismo',
        'Só afeta o humor, não o peso',
      ],
      correctAnswer: 'Dormir pouco aumenta a fome',
    },
  ],
  currentQuestionIndex: 0,
  score: 0,
  answerQuestion: (answer) =>
    set((state) => {
      const isCorrect = state.questions[state.currentQuestionIndex].correctAnswer === answer;
      return {
        score: isCorrect ? state.score + 1 : state.score,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    }),
  restartQuiz: () => set({ currentQuestionIndex: 0, score: 0 }),
}));