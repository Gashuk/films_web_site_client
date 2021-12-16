import {makeAutoObservable} from "mobx";
import {
    COMPOSITION_ROUTE_ADMIN,
    COUNTRY_ROUTE,
    GENRE_ROUTE,
    HUMAN_ROUTE,
    LIST_COMPOSITION_HUMAN_ROUTE,
    LIST_COUNTRY_ROUTE,
    LIST_GENRE_ROUTE,
    LIST_PROFESSION_HUMAN_ROUTE,
    PROFESSION_ROUTE,
    RATING_ROUTE,
    REVIEW_ROUTE,
    TYPE_ROUTE,
    USER_PROFILE_ROUTE,
    USER_RATING_ROUTE, USER_REVIEW_ROUTE
} from "../utils/consts";

export default class TableStore{
    constructor() {
        this._tables_ADMIN =[
            {id: 1, name: 'Произведения', url:COMPOSITION_ROUTE_ADMIN},
            {id: 2, name: 'Список произведение/персона/профессия', url:LIST_COMPOSITION_HUMAN_ROUTE},
            {id: 3, name: 'Список профессия/персона', url:LIST_PROFESSION_HUMAN_ROUTE},
            {id: 4, name: 'Профессии', url:PROFESSION_ROUTE},
            {id: 5, name: 'Персоны', url:HUMAN_ROUTE},
            {id: 6, name: 'Список произвидение/жанр', url:LIST_GENRE_ROUTE},
            {id: 7, name: 'Жанры', url:GENRE_ROUTE},
            {id: 8, name: 'Список произвидение/страна', url:LIST_COUNTRY_ROUTE},
            {id: 9, name: 'Страны', url:COUNTRY_ROUTE},
            {id: 10, name: 'Типы произведения', url:TYPE_ROUTE}
        ]
        // this._rate =["1","2","3","4","5","6","7","8","9","10"]
        this._tables_USER =[
            {id: 1, name: 'Профиль', url:USER_PROFILE_ROUTE},
            {id: 2, name: 'Мои оценки', url:USER_RATING_ROUTE},
            {id: 3, name: 'Мои рецензии', url:USER_REVIEW_ROUTE},
        ]
        this._defaultImg =
        {
            defaultImgHumanUser: '669c38f0-5ea2-4c50-acbf-b9e93bec23dc.jpg' ,
            defaultImgComposition: 'f7552cbd-d5ee-492d-9739-46d44c255868.jpg'
        }

        // this._genre =[]
        //     {id: 1, name: 'комедия'},
        //     {id: 2, name: 'драма'},
        //     {id: 3, name: 'криминал'}
        // ]

        // this._type =[]
        //     {id: 2, name: 'Фильмы'},
        //     {id: 3, name: 'Сериалы'}
        // ]
        // this._profession =[]
        // this._profession =[
        //     {
        //         id: 1,
        //         name: "Режиссер"
        //     },
        //     {
        //         id: 2,
        //         name:"Сценарий"
        //     },
        //     {
        //         id: 3,
        //         name:"Продюссер"
        //     },
        //     {
        //         id: 4,
        //         name: "В главных ролях"
        //     }
        // ]

        // this._country =[]
        //     {id: 1, name: 'Россия'},
        //     {id: 2, name: 'Великобритания'},
        //     {id: 3, name: 'США'}
        // ]

        // this._human =[]
        //     {
        //         id: 1,
        //         fio: "Крэйг Гиллеспи",
        //         img: null
        //     },
        //     {
        //         id: 2,
        //         fio: "Эмма Стоун",
        //         img: "3b8f0035-d0d4-4a07-9182-d2dde03ba046.jpg"
        //     },
        //     {
        //         id: 3,
        //         fio: "Дэна Фокс",
        //         img: "ca47b9d8-906d-4bff-b94e-2d22e5a0c28e.jpg"
        //     },
        //     {
        //         id: 4,
        //         fio: "Тони МакНамара",
        //         img: "720e648a-2dbc-47f1-b3da-ab88660495c4.jpg"
        //     }
        // ]

        // this._list_country =[]
        // this._list_country =[
        //     {id: 1, compositionId: 1, name_composition: "Круэлла", countryId:1, name_country:"Россия"},
        //     {id: 2, compositionId: 2, name_composition: "Круэлла2", countryId:2, name_country:"Велик"},
        //     {id: 3, compositionId: 2, name_composition: "Круэлла2", countryId:3, name_country:"США"},
        //     {id: 4, compositionId: 1, name_composition: "Круэлла", countryId:3, name_country:"США"}
        // ]
        // this._list_genre =[]
        // this._list_genre =[
        //     {id: 1, compositionId: 1, name_composition: "Круэлла", genreId:1, name_genre:"комедия"},
        //     {id: 2, compositionId: 2, name_composition: "Круэлла2", genreId:2, name_genre:"драма"},
        //     {id: 3, compositionId: 2, name_composition: "Круэлла2", genreId:3, name_genre:"криминал"},
        //     {id: 4, compositionId: 1, name_composition: "Круэлла", genreId:3, name_genre:"криминал"}
        // ]

        // this._list_profession_human =[]
        // this._list_profession_human =[
        //     {id: 1, professionId: 2, name_profession: "Сценарий", humanId:3, name_human:"Дэна Фокс"},
        //     {id: 2, professionId: 2, name_profession: "Сценарий", humanId:4, name_human:"Тони МакНамара"},
        //     {id: 3, professionId: 2, name_profession: "Сценарий", humanId:5, name_human:"Алин Брош МакКенна"},
        //     {id: 4, professionId: 1, name_profession: "Режиссер", humanId:1, name_human:"Крэйг Гиллеспи"},
        //     {id: 1, professionId: 3, name_profession: "Продюссер", humanId:6, name_human:"Кристин Барр"},
        //     {id: 2, professionId: 3, name_profession: "Продюссер", humanId:7, name_human:"Гленн Клоуз"},
        //     {id: 3, professionId: 4, name_profession: "В главных ролях", humanId:2, name_human:"Эмма Стоун"},
        //     {id: 4, professionId: 4, name_profession: "В главных ролях", humanId:8, name_human:"Эмма Томпсон"}
        // ]




        // this._list_composition_human =[]
        // this._list_composition_human =[
        //     {id: 1, compositionId: 1, name_composition: "Круэлла", listProfessionHumanId:3, name_profession: "Сценарий", name_human:"Дэна Фокс"},
        //     {id: 2, compositionId: 1, name_composition: "Круэлла", listProfessionHumanId:4, name_profession: "Сценарий", name_human:"Тони МакНамара"},
        //     {id: 3, compositionId: 1, name_composition: "Круэлла", listProfessionHumanId:5, name_profession: "Сценарий", name_human:"Алин Брош МакКенна"},
        //     {id: 4, compositionId: 1, name_composition: "Круэлла", listProfessionHumanId:6, name_profession: "Режиссер", name_human:"Крэйг Гиллеспи"}
        // ]
        // this._rating =[]
        // this._review =[]
        // this._composition=[]

        // this._composition=[
        //     {   id: 1,
        //         name: "Круэлла",
        //         description: "Лондон 70-х годов охвачен зарождающейся культурой панк-рока. Невероятно одаренная мошенница по имени Эстелла решает сделать себе имя в мире моды. ",
        //         img: "94146aea-8a66-462b-9c3b-43505e1b0d75.jpg",
        //         year1: "2021-06-03T00:00:00.000Z",
        //         year2: null,
        //         number_seasons: null,
        //         rating: 0,
        //         createdAt: "2021-06-15T17:12:38.162Z",
        //         updatedAt: "2021-06-15T17:12:38.162Z",
        //         typeId: 2,
        //         name_type: "фильм"
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
        //         typeId: 2,
        //         name_type: "фильм"
        //     }
        // ]



        // this._selectedGenre={}
        // this._selectedColGenreTable=false

        // this._selectedType={}
        // this._selectedColTypeTable=false

        // this._selectedProfession={}
        //this._selectedColProfessionTable=false

        // this._selectedCountry={}
        //this._selectedColCountryTable=false

        // this._selectedHuman={}
        //this._selectedColHumanTable=false

        // this._selectedList_country={}
        //this._selectedColList_countryTable=false

        // this._selectedList_genre={}
        // this._selectedColList_genreTable=false

        // this._selectedList_profession_human={}
        // this._selectedColList_profession_humanTable=false

        // this._selectedList_composition_human={}
        //  this._selectedColList_composition_humanTable=false

        // this._selectedComposition={}
        //  this._selectedColCompositionTable=false

        // this._selectedRating={}
        //
        // this._selectedReview={}

        this._selectedTable_ADMIN={}

        // this._selectedRate={}

        this._selectedTable_USER={}


        makeAutoObservable(this)
    }

    get defaultImg(){
        return this._defaultImg
    }

    // setGenre(genre) {
    //     this._genre= genre
    // }
    // get genre(){
    //     return this._genre
    // }
    //
    // setSelectedGenre(genre){
    //     // this.setSelectedColGenreTable(true)
    //     this._selectedGenre = genre
    // }
    // get selectedGenre(){
    //     return this._selectedGenre
    // }

    // setSelectedColGenreTable(bool) {
    //     this._selectedColGenreTable= bool
    // }
    // get selectedColGenreTable(){
    //     return this._selectedColGenreTable
    // }

    // setType(type) {
    //     this._type= type
    // }
    // get type(){
    //     return this._type
    // }
    //
    // setSelectedType(type){
    //     // this.setSelectedColTypeTable(true)
    //     this._selectedType = type
    // }
    // get selectedType(){
    //     return this._selectedType
    // }

    // setSelectedColTypeTable(bool) {
    //     this._selectedColTypeTable= bool
    // }
    // get selectedColTypeTable(){
    //     return this._selectedColTypeTable
    // }


    // setProfession(profession) {
    //     this._profession= profession
    // }
    // get profession(){
    //     return this._profession
    // }
    //
    // setSelectedProfession(profession){
    //     // this.setSelectedColProfessionTable(true)
    //     this._selectedProfession = profession
    // }
    // get selectedProfession(){
    //     return this._selectedProfession
    // }

    // setSelectedColProfessionTable(bool) {
    //     this._selectedColProfessionTable= bool
    // }
    // get selectedColProfessionTable(){
    //     return this._selectedColProfessionTable
    // }


    // setCountry(country) {
    //     this._country= country
    // }
    // get country(){
    //     return this._country
    // }
    //
    // setSelectedCountry(country){
    //     // this.setSelectedColCountryTable(true)
    //     this._selectedCountry = country
    // }
    // get selectedCountry(){
    //     return this._selectedCountry
    // }

    // setSelectedColCountryTable(bool) {
    //     this._selectedColCountryTable= bool
    // }
    // get selectedColCountryTable(){
    //     return this._selectedColCountryTable
    // }

    // setHuman(human) {
    //     this._human= human
    // }
    // get human(){
    //     return this._human
    // }
    //
    // setSelectedHuman(human){
    //   //  this.setSelectedColHumanTable(true)
    //     this._selectedHuman = human
    // }
    // get selectedHuman(){
    //     return this._selectedHuman
    // }

    // setSelectedColHumanTable(bool) {
    //     this._selectedColHumanTable= bool
    // }
    // get selectedColHumanTable(){
    //     return this._selectedColHumanTable
    // }

    // setList_country(list_country) {
    //     this._list_country= list_country
    // }
    // get list_country(){
    //     return this._list_country
    // }
    //
    // setSelectedList_country(list_country){
    //   //  this.setSelectedColList_countryTable(true)
    //     this._selectedList_country = list_country
    // }
    // get selectedList_country(){
    //     return this._selectedList_country
    // }

    // setSelectedColList_countryTable(bool) {
    //     this._selectedColList_countryTable= bool
    // }
    // get selectedColList_countryTable(){
    //     return this._selectedColList_countryTable
    // }

    // setList_genre(list_genre) {
    //     this._list_genre= list_genre
    // }
    // get list_genre(){
    //     return this._list_genre
    // }
    //
    // setSelectedList_genre(list_genre){
    //     //this.setSelectedColList_genreTable(true)
    //     this._selectedList_genre = list_genre
    // }
    // get selectedList_genre(){
    //     return this._selectedList_genre
    // }

    // setSelectedColList_genreTable(bool) {
    //     this._selectedColList_genreTable= bool
    // }
    // get selectedColList_genreTable(){
    //     return this._selectedColList_genreTable
    // }

    // setList_profession_human(list_profession_human) {
    //     this._list_profession_human= list_profession_human
    // }
    // get list_profession_human(){
    //     return this._list_profession_human
    // }
    //
    // setSelectedList_profession_human(list_profession_human){
    //     //this.setSelectedColList_profession_humanTable(true)
    //     this._selectedList_profession_human = list_profession_human
    // }
    // get selectedList_profession_human(){
    //     return this._selectedList_profession_human
    // }

    // setSelectedColList_profession_humanTable(bool) {
    //     this._selectedColList_profession_humanTable= bool
    // }
    // get selectedColList_profession_humanTable(){
    //     return this._selectedColList_profession_humanTable
    // }

    // setList_composition_human(list_composition_human) {
    //     this._list_composition_human= list_composition_human
    // }
    // get list_composition_human(){
    //     return this._list_composition_human
    // }
    //
    // setSelectedList_composition_human(list_composition_human){
    //     //this.setSelectedColList_composition_humanTable(true)
    //     this._selectedList_composition_human = list_composition_human
    // }
    // get selectedList_composition_human(){
    //     return this._selectedList_composition_human
    // }

    // setSelectedColList_composition_humanTable(bool) {
    //     this._selectedColList_composition_humanTable= bool
    // }
    // get selectedColList_composition_humanTable(){
    //     return this._selectedColList_composition_humanTable
    // }

    // setComposition(composition) {
    //     this._composition= composition
    // }
    // get composition(){
    //     return this._composition
    // }
    //
    // setSelectedComposition(composition){
    //     //this.setSelectedColCompositionTable(true)
    //     this._selectedComposition = composition
    // }
    // get selectedComposition(){
    //     return this._selectedComposition
    // }
    //
    // setSelectedColCompositionTable(bool) {
    //     this._selectedColCompositionTable= bool
    // }
    // get selectedColCompositionTable(){
    //     return this._selectedColCompositionTable
    // }

    // setRating(rating) {
    //     this._rating= rating
    // }
    // get rating(){
    //     return this._rating
    // }
    //
    // setSelectedRating(rating){
    //     this._selectedRating = rating
    // }
    // get selectedRating(){
    //     return this._selectedRating
    // }
    //
    // setReview(review) {
    //     this._review = review
    // }
    // get review(){
    //     return this._review
    // }
    //
    // setSelectedReview(review){
    //     this._selectedReview = review
    // }
    // get selectedReview(){
    //     return this._selectedReview
    // }

    setTable_ADMIN(tables) {
        this._tables_ADMIN= tables
    }

    get tables_ADMIN(){
        return this._tables_ADMIN
    }
    setSelectedTable_ADMIN(table){
        this._selectedTable_ADMIN = table
    }

    get selectedTable_ADMIN(){
        return this._selectedTable_ADMIN
    }
    // get selectedRate(){
    //     return this._selectedRate
    // }
    // get rate(){
    //     return this._rate
    // }
    //
    // setSelectedRate(rate){
    //     this._selectedRate = rate
    // }
    //
    //





    get tables_USER(){
        return this._tables_USER
    }
    setTable_USER(tables) {
        this._tables_USER= tables
    }
    get selectedTable_USER(){
        return this._selectedTable_USER
    }

    setSelectedTable_USER(table){
        this._selectedTable_USER = table
    }

    // get user_auth(){
    //     return this._composition
    // }

    Zarlushka(){

    }

}