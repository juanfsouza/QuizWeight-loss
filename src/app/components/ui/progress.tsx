import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

interface ProgressProps {
  value: number;
  max: number;
}

export const Progress: React.FC<ProgressProps> = ({ value, max }) => {
  const [progress, setProgress] = useState(0);
  const percentage = Math.min((value / max) * 100, 100);

  useEffect(() => {
    setProgress(percentage);
  }, [percentage]);

  return (
    <div className="relative w-full max-w-md flex flex-col items-center mt-4">
      {/* Barra de progresso */}
      <div className="relative w-full h-2 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {/* Ícones de progresso */}
      <div className="flex justify-between w-full mt-2">
        {[...Array(max)].map((_, index) => {
          const isActive = index < value;
          return (
            <div
              key={index}
              className={`w-6 h-6 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out ${isActive ? 'bg-blue-500 scale-125 text-white' : 'bg-gray-400 text-gray-700 opacity-50'} cursor-pointer`}
            >
              <CheckCircle className="w-4 h-4" />
            </div>
          );
        })}
      </div>
    </div>
  );
};