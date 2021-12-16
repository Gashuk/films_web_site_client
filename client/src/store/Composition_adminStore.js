import {makeAutoObservable} from "mobx";

export default class TableStore{
    constructor() {

        this._composition=[]

        this._selectedComposition={}
        makeAutoObservable(this)
    }

    setComposition(composition) {
        this._composition= composition
    }
    get composition(){
        return this._composition
    }

    setSelectedComposition(composition){
        this._selectedComposition = composition
    }
    get selectedComposition(){
        return this._selectedComposition
    }

}