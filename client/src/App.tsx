import RuioWrapper from 'ruio';
import TypingEffectHeader from './components/TypingEffectHeader';
import './App.css';

function App() {
	return (
		<>
			<RuioWrapper>
				<div className="app-container">
					<TypingEffectHeader />
				</div>
			</RuioWrapper>
		</>
	);
}

export default App;
