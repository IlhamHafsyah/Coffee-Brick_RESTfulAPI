const router = require('express').Router()
const {
  getPromocode,
  getPromocodeById,
  postPromocode,
  patchPromocode,
  deletePromocode
} = require('../controller/c_promocode')

router.get('/', getPromocode)
router.get('/:id', getPromocodeById)
router.post('/', postPromocode)
router.patch('/:id', patchPromocode)
router.delete('/:id', deletePromocode)

module.exports = router
