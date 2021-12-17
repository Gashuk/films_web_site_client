import {makeAutoObservable} from "mobx";

export default class TableStore{
    constructor() {

        this._list_genre =[]

        this._selectedList_genre={}

        makeAutoObservable(this)
    }
    setList_genre(list_genre) {
        this._list_genre= list_genre
    }
    get list_genre(){
        return this._list_genre
    }

    setSelectedList_genre(list_genre){
        this._selectedList_genre = list_genre
    }
    get selectedList_genre(){
        return this._selectedList_genre
    }


}