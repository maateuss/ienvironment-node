module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            description: String,
            type: String,
            entityType: String,
            topic: String,
            connected: {type: Boolean, default: false},
            currentValue: {type: String, default: ""},
            img: {type: Object, default: null},
            enabled: {type: Boolean, default: false},
            simulationMode: {type: Boolean, default: false},
            script: {type: String}
            
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