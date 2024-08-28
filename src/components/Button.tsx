import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onPress: () => void;
  bgColor?: string;
}

export const Button = ({ children, onPress, bgColor = 'bg-blue-500' }: Props) => {
  return (
    <button
      onClick={onPress}
      className={`${bgColor} text-white px-2 py-1 rounded hover:brightness-110`}
    >
      {children}
    </button>
  )
}