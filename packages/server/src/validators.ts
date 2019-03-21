import Joi from 'joi';

export const joinRoomEventSchema = Joi.object().keys({
  roomId: Joi.number().required(),
  playerName: Joi.string().required(),
});

export const playCardEventSchema = Joi.object().keys({
  cardId: Joi.string().required(),
});
