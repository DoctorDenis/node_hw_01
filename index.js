const path = require("path");
const fs = require("fs/promises");
// const argv = require("yargs").argv;
const { Command } = require("commander");

const {
  contactsPath,
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");
// -----------------------------------------------------------
const program = new Command();

program.name("index.js").version("0.8.0");

program
  .description("Simple application to manage your contacts list")
  .requiredOption(
    "-a, --action <list | get | add | remove>",
    "action that you might want to use, available actions are: list, get, add, remove"
  )
  .option(
    "--id <string>",
    "contact id, use this argument with get or remove actions arguments"
  )
  .option(
    "-n, --name <string>,",
    "contact name, include it when adding contact"
  )
  .option(
    "-e, --email <string>",
    "contact email, include it when adding contact"
  )
  .option(
    "--action='remove' --id=<string>",
    "delete contact with specified id"
  );

program.parse();
const options = program.opts();

// ---------------------------------------------------------

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
