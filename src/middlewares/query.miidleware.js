export const attachFindQuery = (model) => {
  return (req, res, next) => {
    req.dbQuery = model.find({});
    next();
  };
};
export const attachAddQuery = (model) => {
  return (req, res, next) => {
    req.dbQuery = model.create(req.body);
    next();
  };
};
export const attachUpdateQuery = (model) => {
  return (req, res, next) => {
    req.dbQuery = model.updateOne({}, req.body);
    next();
  };
};
export const attachDeleteQuery = (model) => {
  return (req, res, next) => {
    req.dbQuery = model.deleteOne({});
    next();
  };
};
export const attachFindOneQuery = (model) => {
  return (req, res, next) => {
    req.dbQuery = model.findOne({});
    next();
  };
};
