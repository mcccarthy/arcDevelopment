import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import footerAdornment from '../../assets/Footer Adornment.svg';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	footer: {
		backgroundColor: theme.palette.common.blue,
		width: '100%',
		zIndex: 1302,
		position: 'relative',
	},
	adornment: {
		width: '18em',
		verticalAlign: 'bottom',
		[theme.breakpoints.down('md')]: {
			width: '21em',
		},
		[theme.breakpoints.down('xs')]: {
			width: '15em',
		},
	},
	mainContainer: {
		position: 'absolute',
	},
	link: {
		color: 'white',
		fontFamily: 'Arial',
		fontSize: '0.75rem',
		fontWeight: 'bold',
		textDecoration: 'none',
	},
	gridItem: {
		margin: '3em',
	},
}));

export default function Footer(props) {
	const classes = useStyles();

	return (
		<footer className={classes.footer}>
			<Grid container className={classes.mainContainer} justify='center'>
				<Grid item className={classes.gridItem}>
					<Grid container direction='column' spacing={2}>
						<Grid item component={Link} onClick={() => props.setValue(0)} to='/' className={classes.link}>
							Home
						</Grid>
					</Grid>
				</Grid>
				<Grid item className={classes.gridItem}>
					<Grid container direction='column' spacing={2}>
						<Grid
							item
							component={Link}
							onClick={() => {
								props.setValue(1);
								props.setSelectedIndex(0);
							}}
							to='/services'
							className={classes.link}
						>
							Services
						</Grid>
						<Grid
							item
							component={Link}
							onClick={() => {
								props.setValue(1);
								props.setSelectedIndex(1);
							}}
							to='/customsoftware'
							className={classes.link}
						>
							Custom Software Development
						</Grid>
						<Grid
							item
							component={Link}
							to='/mobileapps'
							onClick={() => {
								props.setValue(1);
								props.setSelectedIndex(2);
							}}
							className={classes.link}
						>
							Mobile App Development
						</Grid>
						<Grid
							item
							component={Link}
							to='/websites'
							onClick={() => {
								props.setValue(1);
								props.setSelectedIndex(3);
							}}
							className={classes.link}
						>
							Website Development
						</Grid>
					</Grid>
				</Grid>
				<Grid item className={classes.gridItem}>
					<Grid container direction='column' spacing={2}>
						<Grid
							item
							component={Link}
							onClick={() => props.setValue(2)}
							to='/revolution'
							className={classes.link}
						>
							The Revolution
						</Grid>
						<Grid
							item
							component={Link}
							onClick={() => props.setValue(2)}
							to='/revolution'
							className={classes.link}
						>
							Vision
						</Grid>
						<Grid
							item
							component={Link}
							to='/revolution'
							onClick={() => props.setValue(2)}
							className={classes.link}
						>
							Technology
						</Grid>
						<Grid
							item
							component={Link}
							onClick={() => props.setValue(2)}
							to='/revolution'
							className={classes.link}
						>
							Process
						</Grid>
					</Grid>
				</Grid>
				<Grid item className={classes.gridItem}>
					<Grid container direction='column' spacing={2}>
						<Grid
							item
							component={Link}
							onClick={() => props.setValue(3)}
							to='/about'
							className={classes.link}
						>
							About Us
						</Grid>
						<Grid
							item
							component={Link}
							onClick={() => props.setValue(3)}
							to='/about'
							className={classes.link}
						>
							History
						</Grid>
						<Grid
							item
							component={Link}
							to='/about'
							onClick={() => props.setValue(3)}
							className={classes.link}
						>
							Team
						</Grid>
					</Grid>
				</Grid>
				<Grid item className={classes.gridItem}>
					<Grid container direction='column' spacing={2}>
						<Grid
							item
							component={Link}
							onClick={() => props.setValue(4)}
							to='/contact'
							className={classes.link}
						>
							Contact Us
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<img src={footerAdornment} className={classes.adornment} alt='footer image' />
		</footer>
	);
}
