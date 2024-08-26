import { colors } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';

const arcBlue = '#0B72B9';
const arcOrange = '#FFBA60';

export default createMuiTheme({
	palette: {
		common: {
			blue: `${arcBlue}`,
			orange: `${arcOrange}`
		},
		primary: {
			main: `${arcBlue}`
		},
		secondary: {
			main: `${arcOrange}`
		}
	},
	typography: {
		fontFamily: "'Fira Code', Helvetica, Arial, sans-serif",
		tab: {
			fontFamily: '"Fira Code", monospace',
			textTransform: 'none',
			fontWeight: 700,
			fontSize: '1rem'
		},
		estimate: {
			fontFamily: 'Italianno',
			fontSize: '1.8rem',
			textTransform: 'none',
			color: 'white',
			letterSpacing: '5px'
		}
	}
});
