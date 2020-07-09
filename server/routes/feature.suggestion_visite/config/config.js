require("dotenv").config();

/**
 * REFRESH LA LISTE DE RANKING DES HOTELS
 */
//cette fonction rebuild toute la liste sans toucher au metier
//c'est a dire que la liste garde son etat en cours, seul les elements
//qui la composent sont mis a jour
if(process.env.REFRESH_RANK === 'true') {
    refreshRanking()
}

async function refreshRanking() {

    //case : Dump Database
    if(process.env.DUMP_DB === 'true') {
        console.log('Impossible de refresh la table HotelRank si la var DUMP_DB est a \'true\'')
        return
    }

    //case : Import test DB
    if(process.env.INSERT_TEST_DB === 'true') {
        console.log('Impossible de refresh la table HotelRank si la var INSERT_TEST_DB est a \'true\'')
        return
    }

    //case : Import DB from external sources
    if(process.env.INSERT_REAL_DB === 'true') {
        console.log('Impossible de refresh la table HotelRank si la var INSERT_TEST_DB est a \'true\'')
        return
    }

    //REFRESH HERE
    console.log('Refresh du ranking en cours, cela peux prendre plsr minutes...')

    const ListHotelRank = require('../lib/ListHotelsRank')
    const listHotelRank = new ListHotelRank()
    await listHotelRank.refreshList()

    console.log('Refresh du ranking en cours, cela peux prendre plsr minutes...')
}