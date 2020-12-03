// --------------------- Import Required Modules ---------------------

const Joi = require("joi");

// --------------------- Create Validation Schema ---------------------

const CredentialsValidationSchema = Joi.object({
  hashedPassword: Joi.string().required().trim().min(60).max(60),
  email: Joi.string()
    .required()
    .trim()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: ["com", "org", "info", "edu", "gov"] },
    })
    .min(5)
    .max(64),
});

module.exports = CredentialsValidationSchema;
