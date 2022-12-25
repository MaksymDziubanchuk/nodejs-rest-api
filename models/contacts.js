const fs = require('fs/promises');
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, './contacts.json')


const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
return JSON.parse(data) ?? null;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  return result ?? null;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const {
    name,
    email,
    phone
  } = body;

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  }
  contacts.push(newContact);
  const parsedNewContactsList = JSON.stringify(contacts, null, 2);
    await fs.writeFile(contactsPath, parsedNewContactsList);
    return newContact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId); 
  const index = contacts.indexOf(result);

  if ( index >= 0 ) {
      contacts.splice(index, 1);
      const parsedNewContactsList = JSON.stringify(contacts, null, 2);
      await fs.writeFile(contactsPath, parsedNewContactsList);
      return true;
    } 
    
  return false;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const {
    name,
    email,
    phone
  } = body;
  const result = contacts.find(item => item.id === contactId); 
  const index = contacts.indexOf(result);

  if ( index >= 0 ) {
      contacts.forEach((item) => {
        if (item.id === contactId) {
          item.name = name;
          item.email = email;
          item.phone = phone;
        }
      });
      const parsedNewContactsList = JSON.stringify(contacts, null, 2);
      await fs.writeFile(contactsPath, parsedNewContactsList);
      const apdatedContact = {
        id: contactId,
        name,
        email,
        phone
      }
      return apdatedContact;
    } 
    
  return false;

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
