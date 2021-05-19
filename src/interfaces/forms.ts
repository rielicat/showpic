import { InputHTMLAttributes } from "react";

export interface Fields extends InputHTMLAttributes<HTMLInputElement> {
  key: string;
  position: number;
}

export interface FormData {
  fields: Fields[];
  buttonText: string;
}
