const router = require('express').Router()
const {
  getCategory,
  getCategoryById
} = require('../controller/c_category')

router.get('/', getCategory)
router.get('/:id', getCategoryById)

module.exports = router
