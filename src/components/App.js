import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Header from '../components/ui/Header';
import theme from './ui/Theme';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Header>Hello</Header>
		</ThemeProvider>
	);
}

export default App;
