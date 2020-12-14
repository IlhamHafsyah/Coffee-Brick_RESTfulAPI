const router = require('express').Router()
const {
  getHistory,
  postHistory,
  postDetailhistory,
  deleteHistory
} = require('../controller/c_history')

router.get('/:id', getHistory)
router.post('/', postHistory)
router.post('/detail', postDetailhistory)
router.delete('/:id', deleteHistory)

module.exports = router
