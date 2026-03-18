const issue = require("../models/issue");;
const mapToken = process.env.MAP_TOKEN;
const maptilerClient = require('@maptiler/client');

maptilerClient.config.apiKey = mapToken;


module.exports.index = async (req, res) => {
       const allissues = await issue.find({});
       res.render("issues/index.ejs", { allissues });
};

module.exports.renderNewForm = (req, res) => {
       res.render("issues/new.ejs");
};

module.exports.showissue = async (req, res) => {
       let { id } = req.params;
       const issue = await issue.findById(id)
           .populate({
               path: "reviews",
               populate: {
                   path: "author",
               },
           })
           .populate("owner");
       if (!issue) {
           req.flash("error", "issue you requested for does not exist!");
           res.redirect("/issues");
           return;
       }
       res.render("issues/show.ejs", { issue });
};



module.exports.createissue = async (req, res, next) => {
        let query = req.body.issue.location;
        let response = await maptilerClient.geocoding.forward(query);

        let url = req.file.path;
        let filename = req.file.filename;
        const newissue = new issue(req.body.issue);
        newissue.owner = req.user._id;
        newissue.image = { url, filename };

        newissue.geometry = response.features[0].geometry;

        let savedissue = await newissue.save();
        console.log(savedissue);
        
        req.flash("success", "New issue Created!");
        res.redirect("/issues");
};


module.exports.renderEditForm = async (req, res) => {
       let { id } = req.params;
       const issue = await issue.findById(id);
       if (!issue) {
           req.flash("error", "issue you requested for does not exist!");
           res.redirect("/issues");
       }
       let originalImageUrl = issue.image.url;
       originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
       res.render("issues/edit.ejs", { issue, originalImageUrl });
};

module.exports.updateissue = async (req, res) => {
  let { id } = req.params;
  let query = ` ${req.body.issue.location},${req.body.issue.country}`;
  let response = await maptilerClient.geocoding.forward(query);
  req.body.issue.geometry=response.features[0].geometry;

  let issue = await issue.findByIdAndUpdate(id, { ...req.body.issue });
  if (typeof req.file !== "undefined") {
      let url = req.file.path;
      let filename = req.file.filename;
      issue.image = { url, filename };
      await issue.save();
  }
  req.flash("success", "issue Updated");
  res.redirect(`/issues/${id}`);
};