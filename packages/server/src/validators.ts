import Joi from 'joi';

export const joinRoomEventSchema = Joi.object().keys({
  roomId: Joi.string().required(),
  playerName: Joi.string().required(),
});

export const playCardEventSchema = Joi.object().keys({
  cardId: Joi.string().required(),
});
