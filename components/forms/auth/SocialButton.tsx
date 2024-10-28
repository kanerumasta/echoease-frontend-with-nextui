interface SocialButtonProps {
  callBack: () => void;
  text: string;
  icon: any;
  color?: string;
}

export default function SocialButton({
  callBack,
  text,
  color,
  icon,
}: SocialButtonProps) {
  return (
    <button
      className={`p-3 rounded-md w-full border-2 border-gray-300/50 border-solid  flex items-center justify-center ${color}`}
      type="button"
      onClick={() => callBack()}
    >
      {icon}
      <div className="mx-1" />
      {text}
    </button>
  );
}
