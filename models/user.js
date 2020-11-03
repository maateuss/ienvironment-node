const bcrypt = require("bcrypt")

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            email: String,
            login: { type: String, required: true, index: {unique: true}},
            password: {type: String, required: true},
            active: Boolean,
            enabled: {type: Boolean, default: false}
        },
        {
            timestamps: true
        }
    );
    schema.pre("save", function(next){
        var user = this;

        if(!user.isModified("password")) return next();

        bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR), function(err, salt){
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash){
                user.password = hash;
                next();
            })
        })
    })

    schema.methods.comparePassword = function(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    };
    schema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    
    const User = mongoose.model("user", schema);
        
    return User;
}