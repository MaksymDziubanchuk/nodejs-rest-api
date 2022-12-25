const {updateContact} = require('../../models/contacts')
const Joi = require('joi');

const updateOne = async (req, res) => {
        
        const result = await updateContact(req.params.contactId, req.body);
      
        if(!result) {
          throw RequestError(404);
        }

        return res.json(result);

}

module.exports = updateOne
