const router = require('express').Router();

//route Add
router.route('/add').get((req, res) => {
    //creer model student
    const newStudent = new Student(
        nom = req.body.nom, 
        prenom = req.body.prenom, 
        promo = req.body.promo, 
        descCursus = req.body.descCursus, 
        email = req.body.email, 
        competencesNotes = JSON.parse(req.body.competenceNote)
        )
    
    //save
    newStudent.save()
        .then(() => res.json('Etudiant ajouté'))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

module.exports = router;