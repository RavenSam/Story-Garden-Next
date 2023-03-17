import Link from "next/link";

export interface ButtonProps {
	onClick?: () => void;
	href?: string;
	label?: string;
	children?: React.ReactNode;
	disabled?: boolean;
	tooltip?: "left" | "right";
	className?: string;
	variant?: "solid" | "outline" | "ghost";
	btnType?: "icon" | "pill" | "rect";
	colorScheme?: "default" | "primary" | "danger" | "warning";
}

export default function Button({
	children,
	label,
	onClick,
	disabled = false,
	className,
	tooltip,
	href,
	variant = "solid",
	btnType = "pill",
	colorScheme = "default",
}: ButtonProps) {
	const colorVariant = {
		solid: {
			default: "bg-black text-white hover:bg-opacity-80 active:bg-black",
			primary: "bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700",
			danger: "bg-red-600 text-white hover:bg-red-500 active:bg-red-700",
			warning: "bg-orange-600 text-white hover:bg-orange-500 active:bg-orange-700",
		},
		outline: {
			default:
				"border border-solid bg-transparent border-black text-gray-700 hover:text-black hover:bg-slate-100 active:bg-slate-200",
			primary:
				"border border-solid bg-transparent border-emerald-500 text-emerald-500 hover:bg-emerald-100 active:bg-emerald-200",
			danger:
				"border border-solid bg-transparent border-red-600 text-red-600 hover:bg-red-100 active:bg-red-200",
			warning:
				"border border-solid bg-transparent border-orange-500 text-orange-500 hover:bg-orange-100 active:bg-orange-200",
		},
		ghost: {
			default:
				"bg-transparent text-gray-700 hover:text-black hover:bg-slate-200 active:bg-slate-300",
			primary: "bg-transparent text-emerald-600 hover:bg-emerald-200 active:bg-emerald-300",
			danger: "bg-transparent text-red-600 hover:bg-red-200 active:bg-red-300",
			warning: "bg-transparent text-orange-500 hover:bg-orange-200 active:bg-orange-300",
		},
	};

	let btnTypeClass = "rounded-full after:rounded-full px-6 py-2";
	if (btnType === "rect") {
		btnTypeClass = "rounded-xl px-6 py-2";
	} else if (btnType === "icon") {
		btnTypeClass = "h-12 w-12 text-2xl rounded-xl";
	}

	let tooltipClassDirection = "";
	if (tooltip === "left") {
		tooltipClassDirection =
			"-translate-x-[100%] -left-3 top-1/2 group-hover:-translate-y-1/2";
	} else if (tooltip === "right") {
		tooltipClassDirection =
			"translate-x-[100%] -right-1 top-1/2 group-hover:-translate-y-1/2";
	}

	const BtnClass = `${className} ${btnTypeClass} ${colorVariant[variant][colorScheme]} space-x-2 focus-visible:outline-none btn relative group transition-all font-semibold`;

	if (href) {
		return (
			<Link
				onClick={onClick}
				aria-label={label}
				className={BtnClass}
				href={href}
			>
				{children}
			</Link>
		);
	} else {
		return (
			<button
				onClick={onClick}
				aria-label={label}
				className={BtnClass}
				disabled={disabled}
			>
				{children}

				{tooltip ? (
					<span
						className={`absolute ${tooltipClassDirection} text-xs bg-gray-800 rounded-xl w-max shadow-xl text-white p-2 opacity-0 transition-all group-hover:opacity-100 pointer-events-none`}
					>
						{label || "label"}
					</span>
				) : null}
			</button>
		);
	}
};

