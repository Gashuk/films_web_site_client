import {makeAutoObservable} from "mobx";

export default class TableStore{
    constructor() {

        this._list_composition_human =[]

        this._selectedList_composition_human={}

        makeAutoObservable(this)
    }

    setList_composition_human(list_composition_human) {
        this._list_composition_human= list_composition_human
    }
    get list_composition_human(){
        return this._list_composition_human
    }

    setSelectedList_composition_human(list_composition_human){
        //this.setSelectedColList_composition_humanTable(true)
        this._selectedList_composition_human = list_composition_human
    }
    get selectedList_composition_human(){
        return this._selectedList_composition_human
    }

}