const connection = require('../config/mysql')

module.exports = {
  getPromocodeModel: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM promocode', (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
          newFunction(result, error)
        })
    })
  },
  getPromocodeByIdModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM promocode WHERE promocode_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  postPromocodeModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO promocode SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              promocode_id: result.insertId,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  patchPromocodeModel: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE promocode SET ? WHERE promocode_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: id,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  },
  deletePromocodeModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM promocode WHERE promocode_id = ?',
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
