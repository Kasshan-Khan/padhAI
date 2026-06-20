import React, { useState, useEffect } from 'react'

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [subject, setSubject] = useState("PHYSICS");
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    // Mock questions for demonstration
    let mockQuestions = [];
    if (subject === "PHYSICS") {
      mockQuestions = [
        {
          id: 1,
          question: "A particle is moving in a circle of radius R with constant speed v. The work done by the centripetal force in one complete revolution is:",
          options: ["2πRv", "mv²/R", "0", "mv²"]
        },
        {
          id: 2,
          question: "Which of the following is not a vector quantity?",
          options: ["Displacement", "Velocity", "Force", "Speed"]
        },
        {
          id: 3,
          question: "The dimension of Planck's constant is same as that of:",
          options: ["Angular Momentum", "Linear Momentum", "Work", "Energy"]
        }
      ];
    } else if (subject === "MATHS") {
      mockQuestions = [
        {
          id: 1,
          question: "The value of lim(x->0) (sin x)/x is:",
          options: ["0", "1", "infinity", "undefined"]
        },
        {
          id: 2,
          question: "The derivative of sin(x) is:",
          options: ["cos(x)", "-cos(x)", "tan(x)", "sec(x)"]
        },
        {
          id: 3,
          question: "Integration of 1/x dx is:",
          options: ["log x", "e^x", "x^2/2", "1/x^2"]
        }
      ];
    } else if (subject === "DSA") {
      mockQuestions = [
        {
          id: 1,
          question: "Time complexity of binary search is:",
          options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"]
        },
        {
          id: 2,
          question: "Which data structure uses LIFO principle?",
          options: ["Queue", "Stack", "Linked List", "Tree"]
        },
        {
          id: 3,
          question: "Worst case time complexity of Quick Sort is:",
          options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"]
        }
      ];
    }
    setQuestions(mockQuestions);
    setSelectedOptions({});
  }, [subject]);

  const handleOptionSelect = (questionId, optionIndex) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-20 animate-fade-in-up animation-delay-400 relative">
      
      {/* Sticky Filter Bar */}
      <div className="sticky top-[140px] z-30 mb-8 w-full flex justify-end">
        <div className="bg-base-100/70 backdrop-blur-xl border border-base-300 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.1)] p-2">
           <select 
            className="select select-bordered select-primary w-48 bg-base-200/50 backdrop-blur-sm shadow-inner font-bold text-base-content focus:outline-none"
            value={subject} 
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="MATHS">📐 MATHS</option>
            <option value="PHYSICS">⚛️ PHYSICS</option>
            <option value="DSA">💻 DSA</option>
          </select>
        </div>
      </div>

      {/* Questions List */}
      <div className="flex flex-col gap-6">
        {questions.map((q, index) => (
          <div 
            key={q.id} 
            className="card bg-base-100/60 backdrop-blur-2xl border border-base-300 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
          >
            {/* Subtle glow border effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"></div>
            
            <div className="card-body p-6 sm:p-8">
              <div className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary shadow-inner">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-base-content mb-6 leading-relaxed">
                    {q.question}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {q.options.map((opt, i) => {
                      const isSelected = selectedOptions[q.id] === i;
                      
                      return (
                        <div 
                          key={i} 
                          onClick={() => handleOptionSelect(q.id, i)}
                          className={`
                            relative px-6 py-4 rounded-xl cursor-pointer border-2 transition-all duration-300 overflow-hidden
                            ${isSelected 
                                ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(16,97,45,0.2)]' 
                                : 'border-base-300 bg-base-200/50 hover:border-primary/50 hover:bg-base-200'}
                          `}
                        >
                          {/* Animated background fill for selected option */}
                          {isSelected && (
                             <div className="absolute inset-0 bg-primary/5 animate-pulse -z-10"></div>
                          )}
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-primary' : 'border-base-content/30'}`}>
                               {isSelected && <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pop"></div>}
                            </div>
                            <span className={`font-medium ${isSelected ? 'text-primary drop-shadow-sm' : 'text-base-content/80'}`}>
                              {opt}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Questions