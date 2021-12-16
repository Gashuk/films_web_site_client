import {makeAutoObservable} from "mobx";

export default class TableStore{
    constructor() {

        this._list_profession_human =[]

        this._selectedList_profession_human={}

        makeAutoObservable(this)
    }

    setList_profession_human(list_profession_human) {
        this._list_profession_human= list_profession_human
    }
    get list_profession_human(){
        return this._list_profession_human
    }

    setSelectedList_profession_human(list_profession_human){
        this._selectedList_profession_human = list_profession_human
    }
    get selectedList_profession_human(){
        return this._selectedList_profession_human
    }

}