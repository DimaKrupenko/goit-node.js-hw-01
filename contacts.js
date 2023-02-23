const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === String(contactId));
  //   console.log(result);
  if (!result) {
    return null;
  }
  return result;
}
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContacts = {
    id: v4(),
    name,
    email,
    phone,
  };
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContacts;
}
async function removeContact(contactId) {
  const contacts = await listContacts();
  const remoteContact = contacts.findIndex(
    contact => contact.id === String(contactId)
  );
  if (remoteContact === -1) {
    return null;
  }
  const newContacts = contacts.filter((__, index) => index !== remoteContact);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contacts[remoteContact];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
