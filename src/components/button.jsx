// import React from "react";

// export const Button = ({ onClick, children, className }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${className}`}
//     >
//       {children}
//     </button>
//   );
// };

// export const Card = ({ children, className }) => {
//   return (
//     <div className={`p-4 bg-white shadow-md rounded-lg ${className}`}>
//       {children}
//     </div>
//   );
// };

// export const CardContent = ({ children }) => {
//   return <div className="text-gray-700">{children}</div>;
// };

import React from "react";

export const Button = ({ onClick, children, className = "" }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out ${className}`}
        >
            {children}
        </button>
    );
};

export const Card = ({ children, className = "" }) => {
    return (
        <div className={`p-4 bg-white shadow-md rounded-lg ${className}`}>
            {children}
        </div>
    );
};

export const CardContent = ({ children, className = "" }) => {
    return (
        <div className={`text-gray-700 ${className}`}>
            {children}
        </div>
    );
};
