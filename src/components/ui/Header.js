import React, { useEffect, useState } from 'react';
import { AppBar, useScrollTrigger, Toolbar, Tabs, Tab, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

function ElevationScroll(props) {
	const { children } = props;

	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0
	});
}

const useStyles = makeStyles((theme) => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
		marginBottom: '3em'
	},
	logo: {
		height: '7em'
	},
	logoContainer: {
		padding: 0, // Remove padding from the Button
		margin: 0, // Remove margin from the Button
		'& .MuiButton-root': {
			padding: 0, // Override the root padding
			minWidth: 'auto'
		},
		'& .MuiButton-text': {
			padding: 0 // Override the text padding
		},
		'&:hover': {
			backgroundColor: 'transparent'
		}
	},
	tabContainer: {
		marginLeft: 'auto'
	},
	tab: {
		...theme.typography.tab,
		minWidth: 10,
		marginLeft: '25px'
	},
	button: {
		borderRadius: '50px',
		marginRight: '25px',
		marginLeft: '50px',
		...theme.typography.estimate,
		height: '45px',
		padding: '30px 30px',
		fontWeight: 'bold',
		boxShadow: '0px 11px 15px rgba(0, 0, 0, 0.65)'
	}
}));

export default function Header(props) {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const handleChange = (e, value) => {
		setValue(value);
	};

	useEffect(() => {
		switch (window.location.pathname) {
			case '/':
				setValue(0);
				break;
			case '/services':
				setValue(1);
				break;
			case '/revolution':
				setValue(2);
				break;
			case '/about':
				setValue(3);
				break;
			case '/contact':
				setValue(4);
				break;
			case '/estimate':
				setValue(5);
				break;
			default:
				break;
		}
	}, [value]);

	return (
		<>
			<ElevationScroll>
				<AppBar position='fixed'>
					<Toolbar disableGutters>
						<Button
							onClick={() => setValue(0)}
							component={Link}
							to='/'
							className={classes.logoContainer}
							disableRipple>
							<img
								src={logo}
								alt='logo'
								className={classes.logo}
							/>
						</Button>
						<Tabs
							value={value}
							onChange={handleChange}
							className={classes.tabContainer}
							indicatorColor='primary'>
							<Tab
								component={Link}
								to='/'
								className={classes.tab}
								label='Home'
							/>
							<Tab
								component={Link}
								to='/services'
								className={classes.tab}
								label='Services'
							/>
							<Tab
								component={Link}
								to='/revolution'
								className={classes.tab}
								label='The Revolution'
							/>
							<Tab
								component={Link}
								to='/about'
								className={classes.tab}
								label='About Us'
							/>
							<Tab
								component={Link}
								to='/contact'
								className={classes.tab}
								label='Contact Us'
							/>
						</Tabs>
						<Button
							variant='contained'
							color='secondary'
							className={classes.button}>
							Free Estimate
						</Button>
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</>
	);
}
