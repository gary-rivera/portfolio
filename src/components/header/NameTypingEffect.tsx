const ASCII = ` ▄▀  ▄▀█ █▀█ █▄█    █▀█ █ █ █ █▀▀ █▀█ ▄▀█
 ▀▄█ █▀█ █▀▄ ▀█▀ ── █▀▄ █ ▀▄▀ ██▄ █▀▄ █▀█`;

export default function Name() {
	return (
		<pre
			role="heading"
			aria-level={1}
			aria-label="Gary Rivera"
			className="glow-name m-0 whitespace-pre text-[8px] font-medium leading-none tracking-tight text-phosphor sm:text-2xs md:text-xs"
		>
			{ASCII}
		</pre>
	);
}
