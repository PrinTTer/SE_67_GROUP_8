function CommonLayout({ children, rightBarContent }) {
    return (
      <div className="flex w-full bg-gray-50 min-h-screen">
        {/* Main content */}
        <div className="flex-1 w-full max-w-screen-xl mx-auto p-6 lg:p-10">
          {children}
        </div>
  
        {/* RightBar (optional) */}
        {rightBarContent && (
          <div className="hidden lg:block w-[300px] p-6">
            {rightBarContent}
          </div>
        )}
      </div>
    );
  }
  
  export default CommonLayout;