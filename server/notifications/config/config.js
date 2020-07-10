//coté client

    //reception : User > User : validation_semaine
        //socket.on('validation_semaine', (notifObject) => {
            //si notifObject.to._id = currentUser._id
                //display notifObject
                //send sur /notifications/read/:idnotifobject
        //})

    //emission (via call route) : User > User : validation_semaine
        //call la route /notifications/valid_semaine/:iduser

    //reception : User > Planner : hotel_non_visité
        //socket.on('hotel_non_visité', (notifObject) => {
            //si currentUser.fonction === Superviseur
                //display notifObject
        //})

    //reception : Planner > User : urgence_added
        //socket.on('urgence_added', (notifObject) => {
            //display notifObject
        //})


//coté serveur


    //emition : User > Planner : hotel_non_visité
        //a la route ou l'user met l'info des hotel non visités
            //socket.emit('hotel_non_visité', hotel)

    //Planner > User : urgence_added
        //socket.emit('urgence_added', urgence)

    //routes
        //ds notif router: GET /notifications/valid_semaine/:iduser
            //socket.emit('validation_semaine', {to: iduser (recup depuis params), elem: "veuillez entrer les hotels que vous avez visité"})

        //ds notif router: POST /notifications/urgence_added/:urgence_id {from: userid}
            //urgence = Urgence.findById(:urgence_id)
            //pour tout les users visiteurs
                //new notifObject = {from: userid, to: userid, elem: urgence, read: false}
            //notifObject.to = 'visiteurs' //pour ne fait qu'un seul emit
            //socket.emit('urgence_added', notifObject)