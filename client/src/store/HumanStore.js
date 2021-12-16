import {makeAutoObservable} from "mobx";

export default class TableStore{
    constructor() {
        this._human =[]
        this._selectedHuman={}

        makeAutoObservable(this)
    }

    setHuman(human) {
        this._human= human
    }
    get human(){
        return this._human
    }

    setSelectedHuman(human){
        this._selectedHuman = human
    }
    get selectedHuman(){
        return this._selectedHuman
    }

}