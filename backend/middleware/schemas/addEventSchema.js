const Joi = require('joi');

const addEventSchema = Joi.object({
    coursLabel: Joi.string().required(),
    roomNumber: Joi.number().required(),
    timeSlot: Joi.object({
        date: Joi.date().required(),
        startTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
        endTime: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required()
    }).required(),
    groupName: Joi.string().required(),
    recurrence: Joi.object({
        status: Joi.boolean().required(),
        frequency: Joi.string().valid('semaine', 'mois').when('status', { is: true, then: Joi.required() }),
        repeatEvery: Joi.number().when('status', { is: true, then: Joi.required() }),
        repeatOn: Joi.object().when('status', { is: true, then: Joi.required() }),
        endType: Joi.string().valid('never', 'date', 'occurrences').when('status', { is: true, then: Joi.required() }),
        endDate: Joi.date().when('endType', { is: 'date', then: Joi.required() }),
        occurrences: Joi.number().when('endType', { is: 'occurrences', then: Joi.required() })
    }).required()
});

module.exports = { addEventSchema };
