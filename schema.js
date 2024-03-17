const Joi = require("joi");
module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        description: Joi.string(),
        price: Joi.number().required().min(0),
        image : Joi.object({
            url: Joi.string().allow("", null),
            fileName: Joi.string().allow("", null),
        }),
        category: Joi.string().valid("trending", "rooms", "iconic-city", "castles", "amazing-pools", "camping", "farms", "arctic").allow("", null),
    })
    .required(),
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required(),
        comment: Joi.string().required(),
    }).required()
})