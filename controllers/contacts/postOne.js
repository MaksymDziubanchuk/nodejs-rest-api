const {addContact} = require('../../models/contacts')



const postOne = async (req, res) => {
  
      const newContact = await addContact(req.body);
     
      return res.status(201).json(newContact);

  }

  module.exports = postOne;
