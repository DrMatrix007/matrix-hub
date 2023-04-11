import { ChangeEvent, ChangeEventHandler, useState } from "react";

export const userInput = (initial_input?: string | undefined) => {
  const [input, setInput] = useState<string>(initial_input ?? "");

  return [
    input,
    (e: ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
  ] as [string, ChangeEventHandler<HTMLInputElement>];
};
