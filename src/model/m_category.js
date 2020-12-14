const connection = require('../config/mysql')

module.exports = {
  getCategoryModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM category', (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
          newFunction(result, error)
        })
    })
  },
  getCategoryByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM product WHERE category_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
function newFunction (result, error) {
  console.log(result)
  console.log(error)
}
