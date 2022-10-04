const path = require("path");
const fs = require("fs/promises");
const { Command } = require("commander");
const process = require("process");
const chalk = require("chalk");
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
    "-p, --phone <string>",
    "contact phone, include it when adding contact"
  )
  .option(
    "--action='remove' --id=<string>",
    "delete contact with specified id"
  );

program.parse();
const options = program.opts();

const { action, id, name, email, phone } = options;

switch (action) {
  case "remove":
    if (!id) {
      console.log(
        chalk.red("Missed argument for id. Please specify, e.g. --id=2")
      );
      process.exit(1);
    }
    break;
  case "add":
    if (!email || !name || !phone) {
      console.log(
        chalk.red(
          "Missed arguments for name, phone or email. Please specify, e.g. --name='Mango' --email='mango@gmail.com' --phone='322-22-22'"
        )
      );
      process.exit(1);
    }
    break;
  case "get":
    if (!id) {
      console.log(
        chalk.red("Missed argument for id. Please specify, e.g. --id=2")
      );
      process.exit(1);
    }
    break;
  default:
    break;
}

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
