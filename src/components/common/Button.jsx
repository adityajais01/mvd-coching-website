
const Button = ({ children, onClick, variant = 'primary', className = '', type = 'button' }) => {

    const baseStyles = "px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 cursor-pointer";

    const variants = {
        primary: "bg-cyan-500 hover:bg-cyan-400 text-zinc-950 shadow-md shadow-cyan-500/20",

        secondary: "bg-zinc-900 hover:bg-zinc-700 text-cyan-400 border border-zinc-800",

        ghost: "text-zinc-400 hover:text-white bg-transparent"
    };


    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
        >
            {children}
        </button>
    );
      
    }

export default Button    