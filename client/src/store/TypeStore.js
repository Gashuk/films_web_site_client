import {makeAutoObservable} from "mobx";

export default class TableStore{
    constructor() {
        this._type =[]

        this._selectedType={}


        makeAutoObservable(this)
    }

    setType(type) {
        this._type= type
    }
    get type(){
        return this._type
    }

    setSelectedType(type){
        // this.setSelectedColTypeTable(true)
        this._selectedType = type
    }
    get selectedType(){
        return this._selectedType
    }

}