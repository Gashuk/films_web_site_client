import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import CompositionStore  from "./store/CompositionStore";
import TableStore from "./store/TableStore";
import RatingStore from "./store/RatingStore";
import ReviewStore from "./store/ReviewStore";
import GenreStore from "./store/GenreStore";
import CountryStore from "./store/CountryStore";
import TypeStore from "./store/TypeStore";
import HumanStore from "./store/HumanStore";
import ProfessionStore from "./store/ProfessionStore";
import List_genreStore from "./store/List_genreStore";
import List_countryStore from "./store/List_countryStore";
import List_composition_humanStore from "./store/List_composition_humanStore";
import List_profession_humanStore from "./store/List_profession_humanStore";
import Composition_adminStore from "./store/Composition_adminStore";

export const Context = createContext(null)
// console.log(process.env.REACT_APP_API_URL)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        composition: new CompositionStore(),
        table: new TableStore(),
        rating: new RatingStore(),
        review: new ReviewStore(),
        genre: new GenreStore(),
        country: new CountryStore(),
        type: new TypeStore(),
        human: new HumanStore(),
        profession: new ProfessionStore(),
        list_genre: new List_genreStore(),
        list_country: new List_countryStore(),
        list_composition_human: new List_composition_humanStore(),
        list_profession_human: new List_profession_humanStore(),
        composition_admin: new Composition_adminStore()
    }} >
        <App />
    </Context.Provider>,
  document.getElementById('root')
);


