import { useState, useEffect, useRef } from "react";

interface CustomNumberInputProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  suffix?: string;
}

export function CustomNumberInput({
  value,
  onChange,
  min = 0,
  max = 500000,
  step = 1000,
  placeholder,
  suffix,
}: CustomNumberInputProps) {
  const [localValue, setLocalValue] = useState<number | undefined>(value);
  const [isOutOfRange, setIsOutOfRange] = useState(false);
  const timerRef = useRef<number>();

  // Sync with external value changes
  useEffect(() => {
    if (value !== localValue) {
      setLocalValue(value);
      setIsOutOfRange(false);
    }
  }, [value]);

  useEffect(() => {
    if (localValue !== undefined) {
      setIsOutOfRange(localValue < min || localValue > max);
    }
  }, [localValue]);

  const handleStep = (direction: 1 | -1) => {
    const update = (current: number | undefined) => {
      const baseValue = current ?? min;
      const newValue = baseValue + step * direction;
      return newValue > max ? max : newValue < min ? min : newValue;
    };

    // Initial update
    setLocalValue(update);

    // Start auto-repeat after delay
    timerRef.current = window.setTimeout(() => {
      timerRef.current = window.setInterval(() => {
        setLocalValue(update);
      }, 30);
    }, 700);
  };

  const handleStopStepping = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      clearTimeout(timerRef.current);
      // Only update parent when stepping stops
      if (localValue !== value) {
        onChange(localValue);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\s/g, "").trim();

    if (newValue === "") {
      setLocalValue(undefined);
      onChange(undefined);
      setIsOutOfRange(false);
    } else {
      const numValue = Number(newValue);
      if (!isNaN(numValue)) {
        setLocalValue(numValue);
        onChange(numValue);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent cursor movement
      // Just do a single increment, don't start continuous stepping
      const update = (current: number | undefined) => {
        const baseValue = current ?? min;
        const newValue = baseValue + step;
        return newValue > max ? max : newValue < min ? min : newValue;
      };
      setLocalValue(update);
      onChange(update(localValue));
    } else if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent cursor movement
      // Just do a single decrement, don't start continuous stepping
      const update = (current: number | undefined) => {
        const baseValue = current ?? min;
        const newValue = baseValue - step;
        return newValue > max ? max : newValue < min ? min : newValue;
      };
      setLocalValue(update);
      onChange(update(localValue));
    }
  };

  const formatValue = (val: number | undefined) =>
    val === undefined ? "" : `${val.toLocaleString("cs-CZ")}`;

  return (
    <div className="relative">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className={`w-full p-3 pl-8 text-center text-2xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isOutOfRange ? "border-red-500" : ""
        }`}
        value={formatValue(localValue)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      {localValue !== undefined && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
          {suffix}
        </span>
      )}

      <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-center">
        <button
          className="h-1/2 rounded-tl-lg flex items-center justify-center px-2 hover:bg-gray-100 active:bg-gray-200 text-gray-500 hover:text-gray-700 touch-manipulation"
          onMouseDown={() => handleStep(1)}
          onMouseUp={handleStopStepping}
          onMouseLeave={handleStopStepping}
          onTouchStart={(e) => {
            e.preventDefault();
            handleStep(1);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleStopStepping();
          }}
        >
          ▲
        </button>
        <button
          className="h-1/2 rounded-bl-lg flex items-center justify-center px-2 hover:bg-gray-100 active:bg-gray-200 text-gray-500 hover:text-gray-700 touch-manipulation"
          onMouseDown={() => handleStep(-1)}
          onMouseUp={handleStopStepping}
          onMouseLeave={handleStopStepping}
          onTouchStart={(e) => {
            e.preventDefault();
            handleStep(-1);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleStopStepping();
          }}
        >
          ▼
        </button>
      </div>
      {isOutOfRange && (
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-5 w-full text-center text-sm text-red-500">
          {localValue! < min
            ? `Nejnižší přípustná hodnota je ${min.toLocaleString("cs-CZ")}`
            : `Nejvyšší přípustná hodnota je ${max.toLocaleString("cs-CZ")}`}
        </div>
      )}
    </div>
  );
}
