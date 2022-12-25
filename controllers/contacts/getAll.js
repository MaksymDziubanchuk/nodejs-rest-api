const {listContacts} = require('../../models/contacts')
const {RequestError}  = require('../../helpers')
    
const getAll = async (_, res) => {

      const contacts = await listContacts();
      if (!contacts){
        throw RequestError(404)
      }
      return res.json(contacts);

  
  }
  module.exports = getAll
