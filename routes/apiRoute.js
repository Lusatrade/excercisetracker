const router = require('express').Router()
const {
    addUser,
    getAllUsers,
    getExcercisesByUserId,
    addExcerciseByUserId,
    getLogsByUserId
} = require('../controllers/controllers')

router.post('/:id/exercises',addExcerciseByUserId)
router.get('/:id/exercises',getExcercisesByUserId)
router.get('/:id/logs',getLogsByUserId)
router.get('/',getAllUsers)
router.post('/',addUser)

module.exports = router