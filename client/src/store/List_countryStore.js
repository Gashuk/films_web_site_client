import {makeAutoObservable} from "mobx";

export default class TableStore{
    constructor() {

        this._list_country =[]

        this._selectedList_country={}

        makeAutoObservable(this)
    }

    setList_country(list_country) {
        this._list_country= list_country
    }
    get list_country(){
        return this._list_country
    }

    setSelectedList_country(list_country){
        this._selectedList_country = list_country
    }
    get selectedList_country(){
        return this._selectedList_country
    }

}