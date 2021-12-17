import {makeAutoObservable} from "mobx";

export default class TableStore{
    constructor() {
        this._genre =[]
        this._selectedGenre={}


        makeAutoObservable(this)
    }

    setGenre(genre) {
        this._genre= genre
    }
    get genre(){
        return this._genre
    }

    setSelectedGenre(genre){
        this._selectedGenre = genre
    }
    get selectedGenre(){
        return this._selectedGenre
    }

}