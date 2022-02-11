import React, { useReducer, useState } from 'react';
import { connect } from 'react-redux';
import dispatchData, { AppState, StateToProps } from './globals/redux/store';
import { backendURL } from './globals/services/apiService';
import { AnyObject } from './types/global-types';
import { testData } from "./_conf/redux";

type PropsType = {
	redirectInfo?: string,
	info?: string
}

function Test(props: AnyObject & PropsType) {
	const params = new URL(document.location.href).searchParams
	const redirect = params.get(testData.REDIRECT_TEST)
	if (redirect) {
		dispatchData(testData.REDIRECT_TEST, redirect)
	}
	return <div>
		<p>{props.redirectInfo ? props.redirectInfo : 'No redirection specified...'}</p>
		<p>{props.info ? props.info: 'No more information...'}</p>	
	</div>
}

export default function() {
	return <StateToProps 
		ns='test' 
		propsMapping={{[testData.REDIRECT_TEST]: 'redirectInfo'}} 
		component={Test}
		info="That's an essential information"
	/>
}

///////////////////////////////////////////////////////////

/**
 *    ====>    Autocomplétion avec material-ui
 */

// function Test(props) {

//     const defaultProps = {
//         options: top100Films,
//         getOptionLabel: option => option.title,
//     };

//     const [value, setValue] = React.useState([]);

//     return (
//         <div >

//             <p>Choix : {
//                 (Array.isArray(value) && value.map(item => <p>{item.id}</p>)) ||
//                 (value && value.id ? value.id : (value ? value : ''))
//             } </p>

//             <Grid container spacing={2}>
//                 <Grid item xs={3}>
//                     <Autocomplete
//                         {...defaultProps}
//                         id="include-input-in-list"
//                         freeSolo
//                         renderInput={params => (
//                             <TextField {...params} label="includeInputInList" fullWidth />
//                         )}
//                     />
//                 </Grid>
//                 <Grid item xs={3}>
//                     <Autocomplete
//                         id="controlled-demo"
//                         options={[{ id: '400 mg' }, { id: '500 mg' },]}
//                         getOptionLabel={option => option.id}
//                         // disableOpenOnFocus
//                         clearOnEscape
//                         freeSolo
//                         // multiple
//                         value={value}
//                         onChange={(event, newValue) => { setValue(newValue); }}
//                         renderInput={params => (
//                             <TextField {...params} label="dosage" fullWidth />
//                         )}
//                     />
//                 </Grid>

//             </Grid>



//         </div>
//     );
// }

// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//     { title: 'The Shawshank Redemption', year: 1994 },
//     { title: 'The Godfather', year: 1972 },
//     { title: 'The Godfather: Part II', year: 1974 },
//     { title: 'The Dark Knight', year: 2008 },
//     { title: '12 Angry Men', year: 1957 },
//     { title: "Schindler's List", year: 1993 },
//     { title: 'Pulp Fiction', year: 1994 },
//     { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
//     { title: 'Life Is Beautiful', year: 1997 },
//     { title: 'The Usual Suspects', year: 1995 },
//     { title: 'Léon: The Professional', year: 1994 },
//     { title: 'Spirited Away', year: 2001 },
//     { title: 'Saving Private Ryan', year: 1998 },
//     { title: 'Once Upon a Time in the West', year: 1968 },
//     { title: 'American History X', year: 1998 },
//     { title: 'Interstellar', year: 2014 },
//     { title: 'Casablanca', year: 1942 },
//     { title: 'City Lights', year: 1931 },
//     { title: 'Psycho', year: 1960 },
//     { title: 'The Green Mile', year: 1999 },
//     { title: 'The Intouchables', year: 2011 },
//     { title: 'Modern Times', year: 1936 },
//     { title: 'Raiders of the Lost Ark', year: 1981 },
//     { title: 'Rear Window', year: 1954 },
//     { title: 'The Pianist', year: 2002 },
//     { title: 'The Departed', year: 2006 },
//     { title: 'Terminator 2: Judgment Day', year: 1991 },
//     { title: 'Back to the Future', year: 1985 },
//     { title: 'Paths of Glory', year: 1957 },
//     { title: 'Django Unchained', year: 2012 },
//     { title: 'The Shining', year: 1980 },
//     { title: 'WALL·E', year: 2008 },
//     { title: 'American Beauty', year: 1999 },
//     { title: 'The Dark Knight Rises', year: 2012 },
//     { title: 'Princess Mononoke', year: 1997 },
//     { title: 'Aliens', year: 1986 },
//     { title: 'Oldboy', year: 2003 },
//     { title: 'Once Upon a Time in America', year: 1984 },
//     { title: 'Witness for the Prosecution', year: 1957 },
//     { title: 'Das Boot', year: 1981 },
//     { title: 'Citizen Kane', year: 1941 },
//     { title: 'North by Northwest', year: 1959 },
//     { title: 'Vertigo', year: 1958 },
//     { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
//     { title: 'Reservoir Dogs', year: 1992 },
//     { title: 'Braveheart', year: 1995 },
//     { title: 'M', year: 1931 },
//     { title: 'Requiem for a Dream', year: 2000 },
// ];