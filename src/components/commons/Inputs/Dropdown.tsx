"use client";

import { useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

import Button from "@/components/commons/Button/Button";
import { useClickOutside } from "@/lib/hooks";
import styles from "./inputs.module.scss";

interface DropdownProps {
  label: string;
  options: string[];
  onChange: (option: string) => void;
}

export default function Dropdown({ label, options, onChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsOpen(false);
  };

  useClickOutside(dropdownRef, handleClose);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <Button type="button" onClick={() => setIsOpen((prev) => !prev)}>
        {label}
        <IoMdArrowDropdown />
      </Button>
      {isOpen && (
        <div className={styles.dropdownList}>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                handleClose();
              }}
              className={styles.dropdownItem}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
