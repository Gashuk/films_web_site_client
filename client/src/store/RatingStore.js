import {makeAutoObservable} from "mobx";

export default class TableStore{
    constructor() {

        this._rate =["1","2","3","4","5","6","7","8","9","10"]

        this._rating =[]

        this._selectedRating={}

        this._selectedRate={}

        makeAutoObservable(this)
    }


    setRating(rating) {
        this._rating= rating
    }
    get rating(){
        return this._rating
    }

    setSelectedRating(rating){
        this._selectedRating = rating
    }
    get selectedRating(){
        return this._selectedRating
    }


    get selectedRate(){
        return this._selectedRate
    }

    get rate(){
        return this._rate
    }

    setSelectedRate(rate){
        this._selectedRate = rate
    }

}