const HotelsRank = require("./HotelRank");
const ElemListHotelsRank = require("./ElemListHotelsRank");
const mongoose = require('mongoose');
const HotelRank = require('../model/hotelrank.model');
const Urgence = mongoose.model('Urgence');
const Hotel = mongoose.model('Hotel');
//const Visite = require("../../../model/visite.model");*
const Visite = mongoose.model('Visite');
const Assoc_user_visite = mongoose.model('Assoc_User_Visite');


class ListHotelsRank extends HotelsRank {

    constructor() {
        super()
        this.listHotelRank = [] //snapshot : image 1:1 de la table HotelRank (peu ne pas etre rempli suivant la situation)
        this.filter = {}
    }

    async get(id = null,  idhotel = null) {

        let elem = {}

        if(id) {
            elem = await HotelRank.findById(id).populate('hotel_id')
        }

        if(idhotel) {
            elem = await HotelRank.findOne({hotel_id: idhotel}).populate('hotel_id')
        }

        return new ElemListHotelsRank(this.rankBehaviour, elem)
    }

    /**
     * @desc recupère la liste d'element, lance création si elle n'existe pas, l'efface si this.reset est true
     * @param {*} $options 
     * @return {Array} : liste d'element ElemListHotelsRank filtré en fonction des options et ordonné par score descroissant
     */
    async list($options = null) {

        //fill this.listHotelRank with ElemListHotelsRank items
        const tmpList = await HotelRank.find({})
                                .populate('hotel_id')
                                .sort({score: 'desc'})
        tmpList.forEach( (hotelRankDB, index) => {
            this.listHotelRank[index] = new ElemListHotelsRank(this.rankBehaviour, hotelRankDB) 
            })

        
        //si le ranking n'a jamais été appelé
        /*if(!this.listHotelRank.length) {

            //create
            await this.set()
        }*/ 
            
        //filters
        if($options) {

            this.filter = $options

            if($options.hasOwnProperty('secteur')) {
                

                //filter snapshot plutot que la requette Mongo
                this.listHotelRank = this.listHotelRank.filter(hotelElem =>

                    //filter
                    hotelElem.hotel_id.cp
                        .toString()
                        .match(new RegExp("^" + $options.secteur + ".*",'g')) !== null
                )
            }
            if($options.hasOwnProperty('hotel_id')) {

                //filter snapshot plutot que la requette Mongo
                this.listHotelRank = this.listHotelRank.filter(hotelElem =>

                    //filter
                    hotelElem.hotel_id._id.toString() === $options.hotel_id
                )
            } 
        }

        return this.listHotelRank
    }

    /**
     * @desc : WARNING : Restore toute la liste a sont état de base (= tout les hotels y sont représentés)
     *         WARNING : pour la cohérence de la liste de suggestion, toutes les visites en cours
     *         (= non efectuées) seront annulées (= éffacées)
     * @param void 
     */
    async reset() {
        //deprogramation de toute les visites
        Visite.deleteMany({visite_effectué: false})
        console.log('Déprogrammation de toute les visites non effectuées (=en cours)')

        //effacement des association des visites non effectuées
        Assoc_user_visite.deleteMany({date_effectue: null})

        //une fois les visites en cours deprogrammées
        const hotels = await Hotel.find({})

         /////Affichage avancement
         prev10Percent = 0
         /////Affichage avancement

        if(hotels.length) {

            //inserer les elements un par un
            for(const hotelDB of hotels) {

                //build list elem
                const elemHotelRank = new ElemListHotelsRank(this.rankBehaviour)
                await elemHotelRank.buildFromHotel(hotelDB)

                //ajouter l'element
                await this.add(elemHotelRank)
               
                ///////Affichage avancement
                let avancement = index * 100 / length
                let value = Math.floor(avancement/10)
                if(value > prev10Percent && value <=10) {
                    console.log(value * 10 + "%")
                    prev10Percent = value
                }
                if(value >= 100)  {
                    console.log('Rafraichissement terminé')
                }
                ///////Affichage avancement
            }
        }
    }

    /**
     * @desc : update la liste en base
     * @param elem : Objet ElemListHotelsRank
     */
    async replace(elem) {

        //update table
        await elem.update()
    }

    /**
     * @desc : insert un element de la liste dans la base et dans le snapshot
     * @param elem : Objet ElemListHotelRank
     */
    async add(elem) {

        //insert in view
        await elem.insert()

        //console.log('Element inséré')
    }

    /**
     * @desc efface un element l'hotel de la liste et du snapshot
     * @param {*} $options 
     */
    remove(elem) {
        
        //INUTILE POUR LE MOMENT
    }

    /**
     * @desc : trigger (Observer) déclanché sur certaines action pour assurer le maintiens de la liste
     * @param {*} objet {element: objet concerné, origin: motif du trigger} 
     */
    async notify(event, data) {
        let listElem = {}

        if(data instanceof Visite)  listElem = await this.get(null, data.hotel_id)
        if(data instanceof Urgence) listElem = await this.get(null, data.hotel_id)
        if(data instanceof Hotel && 
           event !== 'hotel added') listElem = await this.get(null, data._id)

        //actions possibles :
        switch(event) {
            
            //effacer l'hotel du ranking
            case 'visit added' :
                listElem.delete()
                break

            //(re)insert l'hotel au ranking
            case 'hotel added' :
                //creer listElem
                listElem = new ElemListHotelsRank(this.rankBehaviour)
                await listElem.buildFromHotel(data)

            case 'visit done' :
            case 'visit canceled' :

                listElem.insert()
                break

            //update l'hotel ds le ranking
            case 'hotel note updated' :
            case 'urgence added' :
            case 'urgence deleted' :

                //remove urgence du tableau

                listElem.update()
                break
        }

        //always :
        //refresh le score : une partie du score est calculé
        //en fonction de la "date courante" du moment ou il est calculé
        //donc il faut regulièrement le refresh pour assurer une 
        //adéquation du score avec l'etat courant du metier
        this.refreshList()
    }

    async refreshList() {
        const hotelsRank = this.list()
        const length = hotelsRank.length

        for (let index = 0; index < length - 1; index++) {
            await hotelsRank[index].refresh()
        }
    }
}

module.exports = ListHotelsRank;