'use strict';

const db = require('../../../../../models/index.js');

const { Comment, User } = db;

const getComments = async (filters = {}) => {
  const { page = 1, limit = 10, article_id, user_id, comment_id_parent } = filters;

  const where = {
    is_active: true,
  };

  if (article_id !== undefined) {
    where.article_id = article_id;
  }

  if (user_id !== undefined) {
    where.user_id = user_id;
  }

  if (comment_id_parent !== undefined) {
    where.comment_id_parent = comment_id_parent;
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Comment.findAndCountAll({
    where,

    include: [
      {
        model: User,
        attributes: ['user_id', 'name', 'last_name'],
      },
    ],

    order: [['comment_id', 'ASC']],

    limit,
    offset,
  });

  return {
    comments: rows,
    totalItems: count,
    page,
    limit,
    totalPages: Math.ceil(count / limit),
  };
};

module.exports = {
  getComments,
};
