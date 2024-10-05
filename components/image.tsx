type CustomImageProps = {
  width: string;
  height: string;
  src: string;
};

export default function CustomImage({ width, height, src }: CustomImageProps) {
  const style = {
    width: width,
    height: height,
  };

  return (
    <div style={style} className="overflow-hidden rounded-md">
      <img className="w-full h-full object-cover" src={src} />
    </div>
  );
}
