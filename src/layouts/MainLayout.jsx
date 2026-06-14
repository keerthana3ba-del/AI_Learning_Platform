export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-light dark:bg-gradient-dark">
      {children}
    </div>
  );
};
