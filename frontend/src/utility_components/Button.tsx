type ButtonProps = {
	text?: string;
	children?: React.ReactNode;
	onClick?: () => void;
	className: string;
	type?: "button" | "submit" | "reset";
};

const Button = ({ text, children, onClick, className, type }: ButtonProps) => {
	return (
		<button className={className} onClick={onClick} type={type}>
			{text ? text : children}
		</button>
	);
};

export default Button;