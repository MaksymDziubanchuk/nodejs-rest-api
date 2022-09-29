const express = require('express')
const Joi = require('joi');

const router = new express.Router()

const {
listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts')

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  return res.status(200).json(contacts);
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if(contact) {
    return res.status(200).json(contact);
  }
  return res.status(404).json({ message: 'Not found' })
})

router.post('/', async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
        .required(),
    email: Joi.string()
        .email()
        .required(),
    phone: Joi.number()
        .required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    const [{message}] = validationResult.error.details;
    return res.status(400).json({message: message});
  }

  const newContact = await addContact(req.body);
  return res.status(201).json(newContact);
})

router.delete('/:contactId', async (req, res, next) => {
  const status = await removeContact(req.params.contactId);

  if (!status) {
    return res.status(404).json({message: "Not found"});
  }

  return res.status(200).json({message: "contact deleted"});
})

router.put('/:contactId', async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
        .required(),
    email: Joi.string()
        .email()
        .required(),
    phone: Joi.number()
        .required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    const [{message}] = validationResult.error.details;
    return res.status(400).json({message: message});
  }
  
  const result = await updateContact(req.params.contactId, req.body);

  if(!result) {
    return res.status(404).json({message: "Not found"});
  }

  return res.status(200).json(result);
})

module.exports = router
