import React, { useEffect, useState } from 'react';
import { AppBar, useScrollTrigger, Toolbar, Tabs, Tab, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
	},

	menu: {
		backgroundColor: theme.palette.common.blue,
		color: 'white'
	},
	menuItem: {
		...theme.typography.tab,
		opacity: 0.7,
		'&:hover': {
			opacity: 1
		}
	}
}));

export default function Header(props) {
	const classes = useStyles();
	const [value, setValue] = useState(0);
	const [anchorEl, setAnchorEl] = useState(null);
	const [open, setOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleChange = (e, value) => {
		setValue(value);
	};

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
		setOpen(true);
	};

	const handleMenuItemClick = (e, i) => {
		setAnchorEl(null);
		setOpen(false);
		setSelectedIndex(i);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setOpen(false);
	};

	const menuOptions = [
		{ name: 'Services', link: '/services' },
		{ name: 'Custom Software Development', link: '/customsoftware' },
		{ name: 'Mobile App Development', link: '/mobileapps' },
		{ name: 'Website Development', link: '/websites' }
	];

	useEffect(() => {
		switch (window.location.pathname) {
			case '/':
				if (value !== 0) {
					setValue(0);
				}
				break;
			case '/services':
				if (value !== 1) {
					setValue(1);
					setSelectedIndex(0);
				}
				break;
			case '/customsoftware':
				if (value !== 1) {
					setValue(1);
					setSelectedIndex(1);
				}
				break;
			case '/mobileapps': {
				if (value !== 1) {
					setValue(1);
					setSelectedIndex(2);
				}
				break;
			}
			case '/websites':
				if (value !== 1) {
					setValue(1);
					setSelectedIndex(3);
				}
				break;
			case '/revolution':
				if (value !== 2) {
					setValue(2);
				}
				break;
			case '/about':
				if (value !== 3) {
					setValue(3);
				}
				break;
			case '/contact':
				if (value !== 4) {
					setValue(4);
				}
				break;
			case '/estimate':
				if (value !== 5) {
					setValue(5);
				}
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
								// eslint-disable-next-line jsx-a11y/aria-props
								aria-ownes={anchorEl ? 'simple-menu' : undefined}
								aria-haspopup={anchorEl ? 'true' : undefined}
								onMouseOver={(e) => handleClick(e)}
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
							component={Link}
							to='/estimate'
							variant='contained'
							color='secondary'
							className={classes.button}>
							Free Estimate
						</Button>
						<Menu
							id='simple-menu'
							classes={{ paper: classes.menu }}
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							MenuListProps={{ onMouseLeave: handleClose }}
							elevation={0}>
							{menuOptions.map((option, i) => (
								<MenuItem
									key={option + 1}
									classes={{ root: classes.menuItem }}
									component={Link}
									to={option.link}
									selected={i === selectedIndex && value === 1}
									onClick={(event) => {
										handleMenuItemClick(event, i);
										setValue(1);
										handleClose();
									}}>
									{option.name}
								</MenuItem>
							))}
						</Menu>
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</>
	);
}
