interface Props {
	label: string;
	children?: React.ReactNode;
	onClick: () => void;
	disabled?: boolean;
	tooltip?: "left" | "right";
	className?: string;
	variant?: "solid" | "outline" | "ghost";
	type?: "icon" | "pill" | "rect";
	colorScheme?: "primary" | "danger" | "warning";
}

const Button: React.FC<Props> = ({
	children,
	label,
	onClick,
	disabled = false,
	className,
	tooltip,
	variant = "solid",
	type = "pill",
	colorScheme,
}) => {
	let btnVariantClass = "bg-emerald-600 text-white";
	if (variant === "outline") {
		btnVariantClass = `border border-solid border-black`;
	} else if (variant === "ghost") {
		btnVariantClass = "text-black hover:bg-slate-200";
	}

	let btnTypeClass = "rounded-full px-6 py-3";
	if (type === "rect") {
		btnTypeClass = "rounded-xl px-6 py-3";
	} else if (type === "icon") {
		btnTypeClass = "btn-icon";
	}

	let tooltipClassDirection = "";
	if (tooltip === "left") {
		tooltipClassDirection =
			"-translate-x-[100%] -left-1 top-1/2 group-hover:-translate-y-1/2";
	} else if (tooltip === "right") {
		tooltipClassDirection =
			"translate-x-[100%] -right-1 top-1/2 group-hover:-translate-y-1/2";
	}

	return (
		<button
			onClick={onClick}
			aria-label="Focus mode"
			className={`${className} ${btnVariantClass} ${btnTypeClass} relative group`}
			disabled={disabled}
		>
			{children}

			{tooltip ? (
				<span
					className={`absolute ${tooltipClassDirection} text-xs bg-gray-700 rounded-xl w-max shadow-xl text-white p-2 opacity-0 transition-all group-hover:opacity-100 pointer-events-none`}
				>
					{label}
				</span>
			) : null}
		</button>
	);
};

export default Button;
