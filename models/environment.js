
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            description: String,
            equipments: [String],
            events: [String],
            numberOfEquipments: {type: Number, default: 0},
            equipmentsOnline: {type: Number, default: 0},
            img: {type: String, default: ""},
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

    
    const Environment = mongoose.model("environment", schema);
        
    return Environment;
}