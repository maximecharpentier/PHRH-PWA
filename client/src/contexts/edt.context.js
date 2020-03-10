import React, { createContext, Component } from "react";
export const EdtContext = createContext();

export default class EdtContextProvider extends Component {
    state = {
        journees: [
            {
                date: null,
                visites : [
                    //{ date: null, key: null, nom: null, adresse: null, cp: null, nb_chambres_utilise: null, nb_visites_periode: null, anomalie: null, urgence: null, nature: null },
                ]
            }
        ]
    }

    setJourneyUser = (visit) => {
        //get index journée
        const journees = [...this.state.journees]

        //ici on set la date pour sortir des conditions initiales 
        //après la pemièrere affectation
        var indexJournee = 0
        if(this.state.journees[0].date) {
            indexJournee = this.state.journees.findIndex(x => x.date === visit.date);
        }

        //get index visite
        var indexVisit = 0
        //test si on est pas ds condition initiales
        if(this.state.journees[indexJournee].date) {
            indexVisit = this.state.journees[indexJournee].visites.findIndex(x => x.date === visit.date);
        }
        
        //get le tableau des journée
        const visites = [...this.state.journees[indexJournee].visites]
        //remplacer la visite de la jourée
        visites[indexVisit] = visit

        console.log(indexVisit)
        console.log(visit)
        console.log(visites) //PB ICI VISITE AU PREMIER INSERT N'EST PAS PEUPLE

        //set la date de journée pour 

        //replace valeur ds visites
        //visites[indexVisit] = visit //a ce moment on a une copie modifiée du tableau journéeS
        journees[indexJournee].date = visit.date
        journees[indexJournee].visites = visites


        console.log(visites)
        this.setState({ journees })
    }

    render() {
        return (
            <EdtContext.Provider value={{
                setJourneyUser: this.setJourneyUser,
                journees: this.state.journees
            }}>
                {this.props.children}
            </EdtContext.Provider>
        )
    }
}


