const {
  getPromocodeModel,
  getPromocodeByIdModel,
  postPromocodeModel,
  patchPromocodeModel,
  deletePromocodeModel
} = require('../model/m_promocode')
const helper = require('../helper/response')

module.exports = {
  getPromocode: async (req, res) => {
    try {
      const result = await getPromocodeModel()
      return helper.response(res, 200, 'Success Get Category', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getPromocodeById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getPromocodeByIdModel(id)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          'Success Get Category By Id',
          result
        )
      } else {
        return helper.response(res, 404, `Product By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postPromocode: async (req, res) => {
    try {
      const {
        promocode_name,
        promocode_discount,
        promocode_status
      } = req.body
      if (promocode_name == null || promocode_discount == null || promocode_status == null) {
        console.log('All data must be filled in')
      } else {
        const setData = {
          promocode_name,
          promocode_discount,
          promocode_updated_at: new Date(),
          promocode_status
        }
        const result = await postPromocodeModel(setData)
        return helper.response(res, 200, 'Success Post Product', result)
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  patchPromocode: async (req, res) => {
    try {
      const { id } = req.params
      const {
        promocode_name,
        promocode_status,
        promocode_discount
      } = req.body
      if (promocode_name == null || promocode_discount == null || promocode_status == null) {
        console.log('All data must be filled in')
      } else {
        const setData = {
          promocode_name,
          promocode_discount,
          promocode_created_at: new Date(),
          promocode_status
        }
        const checkId = await getPromocodeByIdModel(id)
        if (checkId.length > 0) {
        // proses update data
          const result = await patchPromocodeModel(setData, id)
          return helper.response(res, 200, 'Success Patch Promo Code', result)
        } else {
          return helper.response(res, 404, `Product By Id : ${id} Not Found`)
        }
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deletePromocode: async (req, res) => {
    try {
      const { id } = req.params
      const result = await deletePromocodeModel(id)
      if (result.length == null) {
        return helper.response(
          res,
          200,
          `Success Delete Promo Code By Id : Promo Code ${id} deleted`
        )
      } else {
        return helper.response(res, 404, `Promo Code By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
