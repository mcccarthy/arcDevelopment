import React from 'react';
import { AppBar, useScrollTrigger } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
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
		fontWeight: 'bold'
	}
}));
export default function Header(props) {
	const classes = useStyles();
	const [value, setValue] = useState(0);

	const handleChange = (e, value) => {
		setValue(value);
	};
	return (
		<>
			<ElevationScroll>
				<AppBar position='fixed'>
					<Toolbar disableGutters>
						<img
							src={logo}
							alt='logo'
							className={classes.logo}
						/>
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
								className={classes.tab}
								component={Link}
								to='/contact'
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
