const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center w-full wrapper justify-center min-h-screen bg-primary-50 bg-cover bg-center">
      {children}
    </div>
  );
};

export default Layout;
