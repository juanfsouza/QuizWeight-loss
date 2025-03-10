'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRightIcon } from 'lucide-react';
import { useQuizStore } from './store/quizStore';
import { BackgroundLines } from './components/ui/background-lines';
import Stepper, { Step } from './components/Stepper';
import { TypingAnimation } from './components/ui/typing-animation';
import confetti from 'canvas-confetti';
import TextLogo from './components/TextLogo';
import { AnimatedShinyText } from './components/ui/animated-shiny-text';
import { cn } from '@/lib/utils';
import { span } from 'framer-motion/client';

export default function QuizPage() {
  const { questions, currentQuestionIndex, answerQuestion, score, restartQuiz } = useQuizStore();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);

    // Verifica se é a última pergunta (índice 6)
    if (currentQuestionIndex === 6) {
      // Dispara o efeito de confetti
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);
    }

    setTimeout(() => {
      answerQuestion(answer);
    }, 500);
  };

  if (currentQuestionIndex >= questions.length) {
    return (
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 bg-zinc-900 min-h-screen text-white text-center">
        <h1 className="text-4xl font-bold">Quiz Finalizado!</h1>
        <p className="text-lg mt-2">Sua pontuação: {score} / {questions.length}</p>
        {/* Botão com animação de escala e ícone com rotação */}
        
        <div className="z-10 flex mt-5 items-center justify-center">
          <div
            className={cn(
              "group rounded-full border border-black/5 bg-neutral-400 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-300 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
            )}
          >
            <AnimatedShinyText 
              onClick={restartQuiz}
              className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400"
            >
              <span>↻ Reiniciar</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
        </div>
      </BackgroundLines>
    );
  }

  const question = questions[currentQuestionIndex];

  return (
    <BackgroundLines className="flex flex-col items-center justify-center min-h-screen p-4 text-white bg-zinc-900">
      <Stepper
        key={currentQuestionIndex}
        disableStepIndicators={true}
        initialStep={currentQuestionIndex + 1}
      >
        {questions.map((q, index) => (
          <Step key={index}>
            {index === currentQuestionIndex && (
              <>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center h-23 overflow-hidden z-10">
                  <TypingAnimation>
                    {q.question}
                  </TypingAnimation>
                </motion.div>

                <div className="mt-5 grid grid-cols-1 gap-5 max-w-md">
                  {q.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswerClick(option)}
                      className={`px-4 py-4 rounded-md flex items-center gap-2 z-10 cursor-pointer transition-all duration-300 ${
                        selectedAnswer === option ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'
                      } text-white`}
                    >
                      <CheckCircle />
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
          </Step>
        ))}
      </Stepper>
      <TextLogo />
    </BackgroundLines>
  );
}