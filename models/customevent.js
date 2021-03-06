
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            description: String,
            topic: String,
            script: String,
            enabled: {type: Boolean, default: false}
        },
        {
            timestamps: true
        }
    );
    
    schema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    
    const CustomEvent = mongoose.model("customevent", schema);
        
    return CustomEvent;
}