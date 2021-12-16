import {makeAutoObservable} from "mobx";

export default class TableStore{
    constructor() {

        this._review =[]

        this._selectedReview={}

        makeAutoObservable(this)
    }



    setReview(review) {
        this._review = review
    }
    get review(){
        return this._review
    }

    setSelectedReview(review){
        this._selectedReview = review
    }
    get selectedReview(){
        return this._selectedReview
    }


}