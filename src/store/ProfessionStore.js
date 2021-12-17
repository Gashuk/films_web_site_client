import {makeAutoObservable} from "mobx";

export default class TableStore{
    constructor() {
        this._profession =[]
        this._selectedProfession={}

        makeAutoObservable(this)
    }

    setProfession(profession) {
        this._profession= profession
    }
    get profession(){
        return this._profession
    }

    setSelectedProfession(profession){
        this._selectedProfession = profession
    }
    get selectedProfession(){
        return this._selectedProfession
    }

}