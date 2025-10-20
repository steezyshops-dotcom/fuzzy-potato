const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Introduction", "Resume"
  content: { type: String }, // free text or markdown
  files: [
    {
      fileId: { type: mongoose.Schema.Types.ObjectId, ref: "File" },
      filename: String,
      filePath: String,
    },
  ],
});

const PortfolioSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, default: "Untitled Portfolio" },
    sections: [SectionSchema],
    published: { type: Boolean, default: false },
    shareableLink: { type: String, unique: true, sparse: true }, // generated when published
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", PortfolioSchema);
