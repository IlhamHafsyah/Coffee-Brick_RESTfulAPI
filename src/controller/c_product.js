const {
  getProductModel,
  getProductCountModel,
  getProductByIdModel,
  postProductModel,
  patchProductModel,
  deleteProductModel
} = require('../model/m_product')
const helper = require('../helper/response')
const qs = require('querystring')

module.exports = {
  getProduct: async (request, response) => {
    try {
      const totalData = await getProductCountModel()
      let { page, limit, search, sort } = request.query
      page = parseInt(page)
      limit = parseInt(limit)
      if (search === '') {
        page = page
      } else {
        page = 1
        limit = totalData
      }
      if (sort === '') {
        sort = 'product_id'
      } else {
        page = 1
        limit = totalData
        sort = sort
      }
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const prevLink =
        page > 1
          ? qs.stringify({ ...request.query, ...{ page: page - 1 } })
          : null
      const nextLink =
        page < totalPage
          ? qs.stringify({ ...request.query, ...{ page: page + 1 } })
          : null // page=...&limit=...
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
        nextLink: nextLink && `http://localhost:4000/product?${nextLink}`,
        prevLink: prevLink && `http://localhost:4000/product?${prevLink}`
      }
      const result = await getProductModel(limit, offset, search, sort)
      return helper.response(
        response,
        200,
        'Success Get Product',
        result,
        pageInfo
      )
      // // response.status(200).send(result)
    } catch (error) {
      console.log(error)
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  getProductById: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getProductByIdModel(id)
      if (result.length > 0) {
        return helper.response(
          response,
          200,
          'Success Get Product By Id',
          result
        )
      } else {
        return helper.response(response, 404, `Product By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  postProduct: async (request, response) => {
    try {
      const {
        category_id,
        product_name,
        product_price,
        product_stock,
        product_desc,
        home_delivery,
        dine_in,
        take_away,
        product_status
      } = request.body
      if (category_id == null || product_name == null || product_price == null || product_stock == null || product_desc == null || home_delivery == null || dine_in == null || take_away == null || product_status == null) {
        console.log('All data must be filled in')
      } else {
        const setData = {
          category_id,
          product_name,
          product_price,
          product_stock,
          product_desc,
          home_delivery,
          dine_in,
          take_away,
          product_created_at: new Date(),
          product_status
        }
        const result = await postProductModel(setData)
        return helper.response(response, 200, 'Success Post Product', result)
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  patchProduct: async (request, response) => {
    try {
      const { id } = request.params
      const {
        category_id,
        product_name,
        product_price,
        product_stock,
        product_desc,
        home_delivery,
        dine_in,
        take_away,
        product_status
      } = request.body
      if (category_id == null || product_name == null || product_price == null || product_stock == null || product_desc == null || home_delivery == null || dine_in == null || take_away == null || product_status == null) {
        console.log('All data must be filled in')
      } else {
        const setData = {
          category_id,
          product_name,
          product_price,
          product_stock,
          product_desc,
          home_delivery,
          dine_in,
          take_away,
          product_updated_at: new Date(),
          product_status
        }
        const checkId = await getProductByIdModel(id)
        if (checkId.length > 0) {
        // proses update data
          const result = await patchProductModel(setData, id)
          return helper.response(response, 200, 'Success Patch Product', result)
        } else {
          return helper.response(response, 404, `Product By Id : ${id} Not Found`)
        }
      }
    } catch (error) {
      return helper.response(response, 400, 'Bad Request', error)
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params
      const result = await deleteProductModel(id)
      if (result.length == null) {
        return helper.response(
          res,
          200,
          `Success Delete Product By Id : Product ${id} deleted`
        )
      } else {
        return helper.response(res, 404, `Product By Id : ${id} Not Found`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
