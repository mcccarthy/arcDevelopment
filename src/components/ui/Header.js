import React, { useEffect, useMemo, useState } from 'react';
import { AppBar, useScrollTrigger, Toolbar, Tabs, Tab, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
		marginBottom: '4em',
		[theme.breakpoints.down('md')]: {
			marginBottom: '2em'
		},
		[theme.breakpoints.down('xs')]: {
			marginBottom: '1em'
		}
	},
	logo: {
		height: '8em',
		[theme.breakpoints.down('md')]: {
			height: '6em'
		},
		[theme.breakpoints.down('xs')]: {
			height: '4.5em'
		}
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
	},
	drawerIcon: {
		height: '50px',
		width: '50px',
		color: 'white'
	},
	drawerIconContainer: {
		marginLeft: 'auto',
		'&:hover': {
			backgroundColor: 'transparent'
		}
	},
	drawer: {
		backgroundColor: theme.palette.common.blue
	},
	drawerItem: {
		...theme.typography.tab,
		color: 'white',
		opacity: 0.7
	},
	drawerItemEstimate: {
		backgroundColor: theme.palette.common.orange
	},
	drawerItemSelected: {
		'& .MuiListItemText-root': {
			opacity: 1
		}
	},
	appBar: {
		zIndex: theme.zIndex.modal + 1
	}
}));

export default function Header(props) {
	const classes = useStyles();
	const theme = useTheme();
	const isBrowser = typeof window !== 'undefined';
	const iOS = isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent);

	const matches = useMediaQuery(theme.breakpoints.down('md'));

	const [openDrawer, setOpenDrawer] = useState(false);
	const [value, setValue] = useState(0);
	const [anchorEl, setAnchorEl] = useState(null);
	const [openMenu, setOpenMenu] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleChange = (e, newValue) => {
		setValue(newValue);
	};

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
		setOpenMenu(true);
	};

	const handleMenuItemClick = (e, i) => {
		setAnchorEl(null);
		setOpenMenu(false);
		setSelectedIndex(i);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setOpenMenu(false);
	};

	const menuOptions = [
		{ name: 'Services', link: '/services', activeIndex: 1, selectedIndex: 0 },
		{ name: 'Custom Software Development', link: '/customsoftware', activeIndex: 1, selectedIndex: 1 },
		{ name: 'Mobile App Development', link: '/mobileapps', activeIndex: 1, selectedIndex: 2 },
		{ name: 'Website Development', link: '/websites', activeIndex: 1, selectedIndex: 3 }
	];

	const routes = useMemo(
		() => [
			{ name: 'Home', link: '/', activeIndex: 0 },
			{
				name: 'Services',
				link: '/services',
				activeIndex: 1,
				ariaOwns: anchorEl ? 'simple-menu' : undefined,
				ariaPopup: anchorEl ? 'true' : undefined,
				onMouseOver: handleClick
			},
			{ name: 'The Revolution', link: '/revolution', activeIndex: 2 },
			{ name: 'About Us', link: '/about', activeIndex: 3 },
			{ name: 'Contact Us', link: '/contact', activeIndex: 4 }
		],
		[anchorEl]
	);

	useEffect(() => {
		[...menuOptions, ...routes].forEach((route) => {
			switch (window.location.pathname) {
				case `${route.link}`:
					if (value !== route.activeIndex) {
						setValue(route.activeIndex);
						if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
							setSelectedIndex(route.selectedIndex);
						}
					}
					break;
				default:
					break;
			}
		});
	}, [value, menuOptions, routes, selectedIndex]);

	const tabs = (
		<>
			<Tabs
				value={value}
				onChange={handleChange}
				className={classes.tabContainer}
				indicatorColor='primary'>
				{routes.map((route, index) => (
					<Tab
						key={`${route}${index}`}
						className={classes.tab}
						component={Link}
						to={route.link}
						label={route.name}
						aria-owns={route.ariaOwns}
						aria-haspopup={route.ariaPopup}
						onMouseOver={route.onMouseOver}
					/>
				))}
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
				open={openMenu}
				onClose={handleClose}
				MenuListProps={{ onMouseLeave: handleClose }}
				elevation={0}
				style={{ zIndex: 1302 }}
				keepMounted>
				{menuOptions.map((option, i) => (
					<MenuItem
						key={`${option}${i}`}
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
		</>
	);

	const drawer = (
		<>
			<SwipeableDrawer
				disableBackdropTransition={!iOS}
				disableDiscovery={iOS}
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				onOpen={() => setOpenDrawer(true)}
				classes={{ paper: classes.drawer }}>
				<div className={classes.toolbarMargin} />
				<List disablePadding>
					{routes.map((route) => (
						<ListItem
							key={`${route}${route.activeIndex}`}
							to={route.link}
							selected={value === route.activeIndex}
							classes={{ selected: classes.drawerItemSelected }}
							button
							component={Link}
							divider
							onClick={() => {
								setOpenDrawer(false);
								setValue(route.activeIndex);
							}}>
							<ListItemText
								className={classes.drawerItem}
								disableTypography>
								{route.name}
							</ListItemText>
						</ListItem>
					))}

					<ListItem
						selected={value === 5}
						onClick={() => {
							setOpenDrawer(false);
							setValue(5);
						}}
						divider
						button
						className={classes.drawerItemEstimate}
						component={Link}
						to={'/freeestimate'}>
						<ListItemText
							className={classes.drawerItem}
							disableTypography>
							Free Estimate
						</ListItemText>
					</ListItem>
				</List>
			</SwipeableDrawer>
			<IconButton
				className={classes.drawerIconContainer}
				onClick={() => setOpenDrawer(!openDrawer)}
				disableRipple>
				<MenuIcon className={classes.drawerIcon} />
			</IconButton>
		</>
	);

	return (
		<>
			<ElevationScroll>
				<AppBar
					position='fixed'
					className={classes.appBar}
					elevation={0}>
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
						{matches ? drawer : tabs}
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</>
	);
}
