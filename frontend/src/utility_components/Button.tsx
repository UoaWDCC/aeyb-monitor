type ButtonProps = {
	text?: string;
	children?: React.ReactNode;
	onClick?: () => void;
	className: string;
	type?: "button" | "submit" | "reset";
};

const Button = ({ text, children, onClick, className, type }: ButtonProps) => {

	return (
		<button
			className={`$filter brightness-110 hover:brightness-90 focus:outline-none font-bold py-2 px-4 rounded transition duration-100 transform focus:translate-x-0.5 focus:translate-y-0.5 ${className}`}
			onClick={onClick}
			type={type}
		>
			{text ? text : children}
		</button>
	);
};

export default Button;