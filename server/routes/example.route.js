const router = require('express').Router();
let Student = require('../model/student.model');

//route Get specifiq
router.route('/get/:id').get((req, res) => {
    Student.findById(req.params.id)
        .then(student => res.json(student))
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

//route getAll
router.route('/all').post((req, res) => {
    /*
    let mongoFilter = []
    let filterObj = {}

    req.body.filters.map(filter => {
        //create filter from request
        filterObj[filter.field] = filter.value

        //populate aray filters
        mongoFilter.push(
            {filterObj}
        )
    })*/

    Student.find({})
        .then(students => res.json(students)/*{
            /*var studentsMap = {}
            students.forEach(student => {
                studentsMap[student._id] = student
            })
          
            res.json(studentsMap)*/
        )            
        .catch(err => res.status(400).json('Erreurs: ' + err))
})

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

//route Edit
router.route('/update/:id').post((req, res) => {
    Student.findOneAndUpdate(
        { id: req.params.id }, 
        { $set: { 
            nom: req.body.nom,
            prenom: req.body.prenom,
            promo: req.body.promo,
            descCursus: req.body.descCursus,
            email: req.body.email,
            competencesNotes: JSON.parse(req.body.competenceNote)
        }}, 
        //{ new: true }
        )
        .then(() => { res.json('Etudiant édité')})
        .catch(err => res.status(400).json('Erreurs: ' + err))

})

module.exports = router;