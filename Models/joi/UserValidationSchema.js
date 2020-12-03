// --------------------- Import Required Modules ---------------------

const Joi = require("joi");

const passwordComplexity = require("joi-password-complexity");

// Create Password Complexity Options

const complexityOptions = {
  min: 6,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 0,
  requirementCount: 3,
};

// --------------------- Create Validation Schema ---------------------

const UserValidationSchema = Joi.object({
  firstName: Joi.string().required().alphanum().trim().min(2).max(25),
  lastName: Joi.string().required().alphanum().trim().min(2).max(25),
  email: Joi.string()
    .required()
    .trim()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 3,
      tlds: { allow: ["com", "org", "info", "edu", "gov"] },
    })
    .min(8)
    .max(64),
  password: passwordComplexity(complexityOptions).required().trim(),
  street: Joi.string().required().trim().min(10).max(50),
  city: Joi.string().required().trim().min(3).max(40),
  state: Joi.string().required().trim().min(4).max(14),
  zip: Joi.string().required(),
});

module.exports = UserValidationSchema;
