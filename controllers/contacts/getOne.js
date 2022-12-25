const {getContactById} = require('../../models/contacts')
const {RequestError}  = require('../../helpers')

const getOne = async (req, res) => {

      const id = req.params.contactId;
      const contact = await getContactById(id);
      if(!contact) {
        throw RequestError(404);
      }
      return res.json(contact);

}

  module.exports = getOne;
