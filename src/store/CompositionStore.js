import {makeAutoObservable} from "mobx";

export default class CompositionStore{
    constructor() {
        this._types =[]
        // this._types =[
        //     {id: 2, name: 'Фильмы'},
        //     {id: 3, name: 'Сериалы'}
        // ]
        this._genre =[]
        // this._genre =[
        //     {id: 1, name: 'комедия'},
        //     {id: 2, name: 'драма'},
        //     {id: 3, name: 'криминал'}
        // ]
        this._composition=[]
        this._profession = []
        // const profession = [
        //     {
        //         id: 1,
        //         name: "Режиссер"
        //     },
        //     {
        //         id: 2,
        //         name: "Сценарий"
        //     },
        //     {
        //         id: 3,
        //         name: "Продюссер"
        //     },
        //     {
        //         id: 4,
        //         name: "В главных ролях"
        //     }
        // ]
        // this._composition=[
        //     {   id: 1, name: "Круэлла",
        //         description: "Лондон 70-х годов охвачен зарождающейся культурой панк-рока. Невероятно одаренная мошенница по имени Эстелла решает сделать себе имя в мире моды. ",
        //         img: "94146aea-8a66-462b-9c3b-43505e1b0d75.jpg",
        //         year1: "2021-06-03T00:00:00.000Z",
        //         year2: null,
        //         number_seasons: null,
        //         rating: 0,
        //         createdAt: "2021-06-15T17:12:38.162Z",
        //         updatedAt: "2021-06-15T17:12:38.162Z",
        //         typeId: 2
        //     },
        //     {
        //         id: 2,
        //         name: "Круэлла",
        //         description: "Лондон 70-х годов охвачен зарождающейся культурой панк-рока. Невероятно одаренная мошенница по имени Эстелла решает сделать себе имя в мире моды. ",
        //         img: "b6f2f0b8-1785-4100-aca6-537c009e9845.jpg",
        //         year1: "2021-06-03T00:00:00.000Z",
        //         year2: null,
        //         number_seasons: null,
        //         rating: 0,
        //         createdAt: "2021-06-16T04:15:24.232Z",
        //         updatedAt: "2021-06-16T04:15:24.232Z",
        //         typeId: 2
        //     },
        //     {
        //         id: 2,
        //         name: "Круэлла",
        //         description: "Лондон 70-х годов охвачен зарождающейся культурой панк-рока. Невероятно одаренная мошенница по имени Эстелла решает сделать себе имя в мире моды. ",
        //         img: "b6f2f0b8-1785-4100-aca6-537c009e9845.jpg",
        //         year1: "2021-06-03T00:00:00.000Z",
        //         year2: null,
        //         number_seasons: null,
        //         rating: 0,
        //         createdAt: "2021-06-16T04:15:24.232Z",
        //         updatedAt: "2021-06-16T04:15:24.232Z",
        //         typeId: 2
        //     },
        //     {
        //         id: 2,
        //         name: "Круэлла",
        //         description: "Лондон 70-х годов охвачен зарождающейся культурой панк-рока. Невероятно одаренная мошенница по имени Эстелла решает сделать себе имя в мире моды. ",
        //         img: "b6f2f0b8-1785-4100-aca6-537c009e9845.jpg",
        //         year1: "2021-06-03T00:00:00.000Z",
        //         year2: null,
        //         number_seasons: null,
        //         rating: 0,
        //         createdAt: "2021-06-16T04:15:24.232Z",
        //         updatedAt: "2021-06-16T04:15:24.232Z",
        //         typeId: 2
        //     },
        //     {
        //         id: 2,
        //         name: "Круэлла",
        //         description: "Лондон 70-х годов охвачен зарождающейся культурой панк-рока. Невероятно одаренная мошенница по имени Эстелла решает сделать себе имя в мире моды. ",
        //         img: "b6f2f0b8-1785-4100-aca6-537c009e9845.jpg",
        //         year1: "2021-06-03T00:00:00.000Z",
        //         year2: null,
        //         number_seasons: null,
        //         rating: 0,
        //         createdAt: "2021-06-16T04:15:24.232Z",
        //         updatedAt: "2021-06-16T04:15:24.232Z",
        //         typeId: 2
        //     },
        //     {
        //         id: 2,
        //         name: "Круэлла",
        //         description: "Лондон 70-х годов охвачен зарождающейся культурой панк-рока. Невероятно одаренная мошенница по имени Эстелла решает сделать себе имя в мире моды. ",
        //         img: "b6f2f0b8-1785-4100-aca6-537c009e9845.jpg",
        //         year1: "2021-06-03T00:00:00.000Z",
        //         year2: null,
        //         number_seasons: null,
        //         rating: 0,
        //         createdAt: "2021-06-16T04:15:24.232Z",
        //         updatedAt: "2021-06-16T04:15:24.232Z",
        //         typeId: 2
        //     }
        // ]
        this._selectedType={}
        this._selectedGenre={}
        this._selectedComposition={}

        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types= types
    }
    get types(){
        return this._types
    }

    setSelectedType(type){
        this._selectedType = type
    }
    get selectedType(){
        return this._selectedType
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

    setSelectedGenre(genre){
        this._selectedGenre = genre
    }
    get selectedGenre(){
        return this._selectedGenre
    }

    setGenre(genre) {
        this._genre= genre
    }
    get genre(){
        return this._genre
    }

    setProfession(profession) {
        this._profession= profession
    }
    get profession(){
        return this._profession
    }
}








