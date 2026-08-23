import { ChangeEvent } from "react";
import TextInput from "../Inputs/TextInput";

interface NumberAnswerProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function NumberAnswer({ value, onChange }: NumberAnswerProps) {
  return (
    <label>
      <h3>Number answer</h3>
      <TextInput
        type="number"
        placeholder="0"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

import { IoCloseOutline } from "react-icons/io5";
import Toggle from "../Inputs/Toggle";
import styles from "./question.module.scss";

interface ChoiceAnswerProps {
  type: "single" | "multiple";
  value: string;
  isChecked: boolean;
  onToggleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onTextChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
}

export function ChoiceAnswer({
  type,
  value,
  isChecked,
  onToggleChange,
  onTextChange,
  onDelete,
}: ChoiceAnswerProps) {
  return (
    <div className={styles.answer}>
      <Toggle
        type={type === "multiple" ? "checkbox" : "radio"}
        checked={isChecked}
        onChange={onToggleChange}
      />

      <TextInput
        className={styles.answerInput}
        placeholder="Answer text"
        value={value}
        onChange={onTextChange}
      />

      <button onClick={onDelete}>
        <IoCloseOutline className={styles.answerDelete} />
      </button>
    </div>
  );
}
