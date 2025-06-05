import { Button } from "@/components/ui/button";

import { useState } from "react";
import { CustomNumberInput } from "@/components/CustomNumberInput";
import clsx from "clsx";
import { Slider } from "@/components/ui/slider";

export function Kalkulacka1() {
  const [finished, setFinished] = useState(false);
  const [income, setIncome] = useState<number>();
  const [type, setType] = useState<number>();
  const [expense, setExpense] = useState<number>(50);
  const [children, setChildren] = useState<number>();


  return (
    <div className="p-1">
      <div className="mx-auto p-4 bg-white rounded-lg shadow-md">
        {!finished && (
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-2 text-center">Kalkulačka OSVČ</h2>
            <p className="text-lg mb-6">Spočítejte si něco. Nikam se to neukládá.</p>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Jaké jsou vaše roční tržby?</h3>
              <CustomNumberInput
                min={0}
                max={50000000}
                step={500}
                placeholder={"Částka v Kč"}
                suffix="Kč"
                value={income}
                onChange={(value) => setIncome(value)}
              />
              {!!income && (
                <p className="text-sm text-center mt-2">
                  {income < 100000 && "Není to málo?"}
                  {income > 3000000 && "Není to moc?"}
                </p>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Jaký jste typ OSVČ?</h3>
              <div className="space-y-3">
                {[
                  "Řemeslník nebo zemědělec (80% paušál)",
                  "Kancelářská živnost, např. IT, administrativa či profesní služby (60% paušál)",
                  "Další živnost (60% paušál)",
                  "Pronájem (30% paušál)",
                  "Jiné podnikání: dle zvl. předpisů; příjmy z autorských práv; nezávislá povolání (40% paušál)",
                ].map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setType(idx)}
                    className={clsx("w-full text-left p-2 rounded border hover:bg-gray-50 transition-colors", idx === type && "bg-gray-200 hover:bg-gray-300")}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Jaké jsou vaše skutečné výdaje?</h3>
              <div className="">
                <div className="text-center mb-5 font-bold">
                  {expense} %
                </div>
                <Slider
                  className="mb-1"
                  min={0}
                  max={100}
                  step={1}
                  value={[expense]}
                  onValueChange={(value) => setExpense(value[0])}
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>
                    0 %
                  </span>
                  <span>
                    100 %
                  </span>
                </div>
              </div>
            </div>


            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Na kolik dětí uplatňujete slevu?</h3>
              <CustomNumberInput
                min={0}
                max={3}
                step={1}
                placeholder="Počet dětí"
                value={children}
                onChange={(value) => setChildren(value)}
              />
            </div>

            <Button
              size="lg"
              onClick={() => setFinished(true)}
            >
              Spočítat
            </Button>
          </div>
        )}

        {finished && (
          <div className="flex flex-col">
            <Button
              variant="ghost"
              className="mt-1 text-sm text-gray-500 hover:text-gray-700"
              onClick={() => setFinished(false)}
            >
              Upravit zadání
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Kalkulacka1;
