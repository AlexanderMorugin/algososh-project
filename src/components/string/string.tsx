import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../hooks/useForm";
import { ISort, sorting } from "./utils";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { setDelay } from "../../utils";

export const StringComponent: React.FC = () => {
  const [letters, setLetters] = React.useState<Array<ISort>>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { values, setValues, handleChange } = useForm({ string: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const word = values.string.split("").map((letter) => {
      return { letter, state: ElementStates.Default };
    });

    setIsLoading(true);
    setLetters(word);

    const end = word.length - 1;    
    const mid = Math.ceil(word.length / 2);
    for (let i = 0; i < mid; i++) {
      let j = end - i;
      if (i !== j) {
        [word[i].state, word[j].state] = [
          ElementStates.Changing,
          ElementStates.Changing,
        ];

        setLetters([...word]);
        await setDelay(DELAY_IN_MS);
      }

      sorting(word, i, j);
      [word[i].state, word[j].state] = [
        ElementStates.Modified,
        ElementStates.Modified,
      ];

      setLetters([...word]);
    }
    setValues({ string: "" });
    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          extraClass={styles.input}
          placeholder="Введите текст"          
          type="text"
          name="string"
          value={values.string}
          isLimitText={true}
          maxLength={11}
          onChange={handleChange}
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={isLoading}
          disabled={!values.string || values.string.length > 11}
        />
      </form>
      <ul className={styles.circles}>
        {letters.map((letter, index) => {
          return (
            <li className={styles.circle} key={index}>
              <Circle letter={letter.letter} state={letter.state} />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
