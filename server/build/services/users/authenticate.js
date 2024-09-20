"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/users/authenticate.ts
var authenticate_exports = {};
__export(authenticate_exports, {
  AuthenticateUseCase: () => AuthenticateUseCase
});
module.exports = __toCommonJS(authenticate_exports);

// src/services/errors/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("invalid credentials");
  }
};

// src/services/users/authenticate.ts
var import_bcryptjs = require("bcryptjs");
var AuthenticateUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    email,
    password,
    desactivated
  }) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError();
    }
    console.log("Retrieved hashed password from database:", user.passwordHash);
    const doesPasswordMatch = await (0, import_bcryptjs.compare)(password, user.passwordHash);
    const isDesactivated = user.desactivated;
    if (isDesactivated) {
      throw new InvalidCredentialsError();
    }
    console.log("Does password match?", doesPasswordMatch);
    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }
    return {
      user
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthenticateUseCase
});
