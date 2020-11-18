const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const s3 = new aws.S3();

module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  schema.pre("save", function () {
    if (!this.url) {
      this.url = `${process.env.APP_URL}/api/file/${this.key}`;
    }
  });

  
  schema.pre("remove", function () {
    if (process.env.STORAGE_TYPE === "s3") {
      return s3
        .deleteObject({
          Bucket: process.env.BUCKET_NAME,
          Key: this.key,
        })
        .promise()
        .then((response) => {
          console.log(response.status);
        })
        .catch((response) => {
          console.log(response.status);
        });
    } else {
      return promisify(fs.unlink)(
        path.resolve(__dirname, "..", "tmp", "uploads", this.key)
      );
    }
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const File = mongoose.model("file", schema);

  return File;
};
