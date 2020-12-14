const {
  getHistoryModel,
  postHistoryModel,
  postDetailhistoryModel,
  deleteHistoryModel
} = require('../model/m_history')
const helper = require('../helper/response')
const { json } = require('body-parser')
const { raw } = require('mysql')

module.exports = {
  getHistory: async (req, res) => {
    try {
      const { id } = req.params
      const result = await getHistoryModel(id)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          'Success Get History By Id',
          result
        )
      } else {
        return helper.response(res, 404, `History By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postHistory: async (req, res) => {
    try {
      const {
        invoice,
        payment_method,
        subtotal,
        user_id,
        status
      } = req.body
      if (invoice == null || payment_method == null || subtotal == null || user_id == null || status ==null) {
        console.log('All data must be filled in')
      } else {
        const setData = {
          invoice,
          payment_method,
          subtotal,
          user_id,
          history_created_at: new Date(),
          status
        }
        const result = await postHistoryModel(setData)
        return helper.response(res, 200, 'Success Post History', result)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postDetailhistory: async (req, res) => {
    try {
      console.log(req.body)
      // const {
      //   product_id,
      //   qty,
      //   total,
      //   history_id
      // } = req.body
      // const setData = {
      //   product_id,
      //   qty,
      //   total,
      //   history_id,
      //   history_created_at: new Date()
      // }
      // const result = await postDetailhistoryModel(setData)
      // return helper.response(res, 200, 'Success Post History', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteHistory: async (req, res) => {
    try {
      const { id } = req.params
      const result = await deleteHistoryModel(id)
      if (result.length == null) {
        return helper.response(
          res,
          200,
            `Success Delete History By Id : History ${id} deleted`
        )
      } else {
        return helper.response(res, 404, `History By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
