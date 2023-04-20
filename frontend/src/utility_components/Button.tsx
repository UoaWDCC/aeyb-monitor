type ButtonProps = {
	text: string;
	onClick?: () => void;
	className: string;
	type?: "button" | "submit" | "reset";
};

const Button = ({ text, onClick, className, type }: ButtonProps) => {
	return (
		<button className={className} onClick={onClick} type={type}>
			{text}
		</button>
	);
};

export default Button;