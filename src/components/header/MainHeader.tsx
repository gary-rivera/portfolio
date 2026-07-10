import Carat from "@components/Carat";
import Name from "./NameNeonPhosphor";
import "@styles/main-header.css";

export default function MainHeader() {
	return (
		<header className="mh">
			<div className="mh-marquee">
				<span className="mh-frame-label" aria-hidden="true">
					ident&nbsp;&nbsp;//&nbsp;&nbsp;<b>callsign</b>
				</span>
				<span className="mh-reticle tl" aria-hidden="true" />
				<span className="mh-reticle tr" aria-hidden="true" />
				<span className="mh-reticle bl" aria-hidden="true" />
				<span className="mh-reticle br" aria-hidden="true" />
				<span className="mh-graticule" aria-hidden="true" />
				<span className="mh-sweep" aria-hidden="true" />

				<div className="mh-name-layer">
					<Name />
				</div>
				<div className="mh-role">
					<span className="p">fullstack engineer</span>
					<Carat variant="phosphor" />
					<span className="d">with a splash of design</span>
				</div>
				<div className="mh-geo">
					sf, ca · pdt · 37.7599°N 122.4148°W
					<span className="animate-blink-phosphor text-phosphor">&nbsp;▋</span>
				</div>
			</div>
		</header>
	);
}
