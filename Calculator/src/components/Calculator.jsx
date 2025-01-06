import React, { useState } from "react";
import { Delete, Plus, Minus, X, Divide } from "lucide-react";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [lastOperation, setLastOperation] = useState("");

  const handleNumber = (num) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
    setEquation((prev) => prev + num);
    setLastOperation("");
  };

  const handleOperator = (op) => {
    if (lastOperation || equation === "") return;

    let operatorToAdd = op;
    if (op === "×") operatorToAdd = "*";
    if (op === "÷") operatorToAdd = "/";

    setLastOperation(operatorToAdd);
    setEquation((prev) => prev + " " + operatorToAdd + " ");
    setDisplay("0");
  };

  const handleBracket = (bracket) => {
    if (bracket === "(" && /\d$/.test(equation)) return;
    if (bracket === ")" && !/\d$/.test(equation)) return;

    setEquation((prev) => prev + bracket);
    setDisplay("0");
    setLastOperation("");
  };

  const handleBackspace = () => {
    if (equation.length > 0) {
      let newEquation = equation;
      if (equation.endsWith(" ")) {
        newEquation = equation.slice(0, -3);
        setLastOperation("");
      } else {
        newEquation = equation.slice(0, -1);
      }
      setEquation(newEquation);
      const lastNumber =
        newEquation
          .split(/[\s\(\)]/)
          .filter(Boolean)
          .pop() || "0";
      setDisplay(lastNumber);
    } else {
      setDisplay("0");
    }
  };

  const calculate = () => {
    try {
      let cleanEquation = equation.replace(/×/g, "*").replace(/÷/g, "/");

      const result = new Function("return " + cleanEquation)();
      const formattedResult = Number.isInteger(result)
        ? result.toString()
        : result.toFixed(8).replace(/\.?0+$/, "");

      setDisplay(formattedResult);
      setEquation(formattedResult);
      setLastOperation("");
    } catch (error) {
      setDisplay("Error");
      setEquation("");
      setLastOperation("");
    }
  };

  const clear = () => {
    setDisplay("0");
    setEquation("");
    setLastOperation("");
  };

  const getOperatorIcon = (op) => {
    switch (op) {
      case "+":
        return <Plus className="text-white" size={20} />;
      case "-":
        return <Minus className="text-white" size={20} />;
      case "×":
        return <X className="text-white" size={20} />;
      case "÷":
        return <Divide className="text-white" size={20} />;
      default:
        return op;
    }
  };

  const buttons = [
    "C",
    "(",
    ")",
    <Delete size={20} />,
    "7",
    "8",
    "9",
    "÷",
    "4",
    "5",
    "6",
    "×",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];

  const getBtnClassName = (btn) => {
    const baseClass = `
      h-14 rounded-lg text-white text-xl font-light flex items-center justify-center
      transform transition-all duration-100
      hover:scale-95 hover:brightness-110
      active:scale-90 active:brightness-90
      focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
    `;

    if (/[0-9.]/.test(btn)) return `${baseClass} bg-gray-700`;
    if (/[÷×\-+]/.test(btn)) return `${baseClass} bg-blue-600`;
    if (btn === "=") return `${baseClass} bg-sky-600`;
    if (/[\(\)]/.test(btn)) return `${baseClass} bg-gray-600`;
    if (btn === "C") return `${baseClass} bg-gray-600`;
    return `${baseClass} bg-red-600 hover:bg-red-500`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-xs bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transform transition-all">
        <div className="p-4 ">
          <div className=" text-blue-400 text-sm font-medium mb-2">
            Calculator made by <span className="font-bold">PRINCE</span>
          </div>
          <div className="text-right mb-2">
            <div className="text-gray-400 text-sm h-6 overflow-hidden">
              {equation || "\u00A0"}
            </div>
            <div className="text-white text-4xl font-light tracking-wider overflow-hidden">
              {display}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4">
            {buttons.map((btn, index) => (
              <button
                key={index}
                className={getBtnClassName(btn)}
                onClick={() => {
                  if (/[0-9.]/.test(btn)) handleNumber(btn);
                  else if (/[÷×\-+]/.test(btn)) handleOperator(btn);
                  else if (/[\(\)]/.test(btn)) handleBracket(btn);
                  else if (btn === "=") calculate();
                  else if (btn === "C") clear();
                  else if (React.isValidElement(btn)) handleBackspace();
                }}
              >
                {typeof btn === "string" && /[÷×\-+]/.test(btn)
                  ? getOperatorIcon(btn)
                  : btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
