const server = require("../server.js")

module.exports = (mongoose, mongoosePaginate) => {

  var schema = mongoose.Schema(
    {
      name: String,
      climate: String,
      terrain: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    const filmsAppearences = server.SWPlanets.find(p => 
      p.name.trim().toLowerCase() === object.name.trim().toLowerCase());
    object.id = _id;
    object.TotalFilmsAppearences =  filmsAppearences ?  filmsAppearences.films : 0;
    return object;
  });

  schema.plugin(mongoosePaginate);
  const Planet = mongoose.model("planet", schema);

  return Planet;
};