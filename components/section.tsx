export const Section = ({ title, children }:{title:string, children:React.ReactNode}) => {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <div className="text-lg">{children}</div>
      </div>
    );
  };
