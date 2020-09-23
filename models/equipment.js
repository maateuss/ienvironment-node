module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            description: String,
            isSensor: Boolean,
            isActuator: Boolean,
            Type: String,
            topic: String
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

    
    const Equipment = mongoose.model("equipment", schema);
        
    return Equipment;
}