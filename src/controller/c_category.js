const {
  getCategoryModel,
  getCategoryByIdModel
} = require('../model/m_category')
const helper = require('../helper/response')

module.exports = {
  getCategory: async (req, res) => {
    try {
      const result = await getCategoryModel()
      return helper.response(res, 200, 'Success Get Category', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getCategoryByIdModel(id)
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
  }
}
