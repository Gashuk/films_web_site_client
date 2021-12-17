import {makeAutoObservable} from "mobx";

export default class TableStore{
    constructor() {
        this._country =[]

        this._selectedCountry={}

        makeAutoObservable(this)
    }

    setCountry(country) {
        this._country= country
    }
    get country(){
        return this._country
    }

    setSelectedCountry(country){
        // this.setSelectedColCountryTable(true)
        this._selectedCountry = country
    }
    get selectedCountry(){
        return this._selectedCountry
    }

}