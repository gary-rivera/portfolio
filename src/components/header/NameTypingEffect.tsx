const ASCII = ` ▄▀  ▄▀█ █▀█ █▄█    █▀█ █ █ █ █▀▀ █▀█ ▄▀█
 ▀▄█ █▀█ █▀▄ ▀█▀ ── █▀▄ █ ▀▄▀ ██▄ █▀▄ █▀█`;

function Name() {
	return (
		<pre
			role="heading"
			aria-level={1}
			aria-label="Gary Rivera"
			className="m-0 overflow-x-auto whitespace-pre text-[8px] font-medium leading-none tracking-tight text-phosphor sm:text-[10px] md:text-[11px]"
			style={{ textShadow: "0 0 12px rgba(123, 192, 137, 0.25)" }}
		>
			{ASCII}
		</pre>
	);
}

export default Name;
