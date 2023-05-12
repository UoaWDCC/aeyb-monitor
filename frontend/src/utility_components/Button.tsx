import React, { FC, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: 'small' | 'medium' | 'large';
	color?: string;
}

// $filter brightness-110 hover:brightness-90 focus:outline-none font-bold py-2 px-4 rounded transition duration-100 transform focus:translate-x-0.5 focus:translate-y-0.5

const Button: FC<ButtonProps> = ({ size = 'medium', color = 'blue', ...rest }) => {
	const buttonClasses = classNames(
		'rounded-md font-medium $filter brightness-100 hover:brightness-110 focus:outline-none transition duration-100 transform focus:translate-x-0.5 focus:translate-y-0.5',
		{
			'text-sm px-3 h-9': size === 'small',
			'text-base px-3 h-10': size === 'medium',
			'text-lg px-3.5 h-12': size === 'large',

			'bg-blue-500 text-white': color === 'blue',
			'bg-green-500 text-white': color === 'green',
			'bg-red-500 text-white': color === 'red',
		}
	);

	return (
		<button className={buttonClasses} {...rest} />
	);
};

export default Button;
