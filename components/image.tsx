import { cn } from "@/lib/utils";

type CustomImageProps = {
  width: string;
  height: string;
  src: string;
  className?:string
  onPress ?: () => void
};

export default function CustomImage({ width, height, src, className, onPress }: CustomImageProps) {
  const style = {
    width: width,
    height: height,
  };

  return (
    <div onClick={onPress} style={style} className={cn("overflow-hidden rounded-md",className)}>
      <img className="w-full h-full object-cover" src={src} />
    </div>
  );
}
