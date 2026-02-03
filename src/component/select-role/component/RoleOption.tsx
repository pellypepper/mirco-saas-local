"use client";



interface RoleOptionProps {

  text: string;
}

export default function RoleOption({ text }: RoleOptionProps) {
  return (
    <li className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-chart-2"></div>

      {text}
    </li>
  );
}