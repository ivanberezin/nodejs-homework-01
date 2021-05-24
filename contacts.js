const fs = require('fs');
const path = require('path');

const {promises: fsPromises} = fs;

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
    const contacts = await fsPromises.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  }

async function getContactById(contactId) {
    const contactsJSON = await listContacts();
    const contactFindById = contactsJSON.find(contact => contact.id === contactId);
    if (!contactFindById) {console.log("Contact not found !");}
    return contactFindById;
  }
  
async function removeContact(contactId) {
    const contactsJSON = await listContacts();
    const contactFind = contactsJSON.find(contact => contact.id === contactId);
    if (!contactFind) {
        return console.log("Contact not found !");
    }
    const contactsFilteredJSON = contactsJSON.filter(contact => contact.id !== contactId);
    console.table(contactsFilteredJSON);
    const contactsFilteredSTR = JSON.stringify(contactsFilteredJSON);
    await fsPromises.writeFile(contactsPath, contactsFilteredSTR);
  }
  

async function addContact(name, email, phone) {
    const contactsJSON = await listContacts();
    const contactFindById = contactsJSON.find(contact => contact.name === name);
    if (contactFindById) {
        return console.log("Contact is already in db!");
    }
    const id = contactsJSON.length + 1;
    const newContact = {id, name, email, phone};
    console.log('newContact: ', newContact);
    const newContactsJSON = [...contactsJSON, newContact];
    console.table(newContactsJSON);
    const newContactsSTR = JSON.stringify(newContactsJSON);
    await fsPromises.writeFile(contactsPath, newContactsSTR);
    return newContactsSTR;
  }

  module.exports = {listContacts, getContactById, removeContact, addContact};