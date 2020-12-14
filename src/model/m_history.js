const connection = require('../config/mysql')

module.exports = {
  getHistoryModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM history WHERE history_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  postHistoryModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO history SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: result.insertId,
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
  postDetailhistoryModel: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO detailhistory SET ?',
        setData,
        (error, result) => {
          if (!error) {
            const newResult = {
              product_id: result.insertId,
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
  deleteHistoryModel: (id) => {
    return new Promise((resolve, reject) => {
      connection.query('DELETE FROM history WHERE history_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
