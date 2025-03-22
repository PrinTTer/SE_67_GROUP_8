// src/components/LoadingSpinner.jsx

const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-70"></div>
      </div>
    );
  };
  
  export default LoadingSpinner;
  