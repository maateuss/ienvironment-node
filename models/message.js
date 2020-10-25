
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            topic: String,
            ambienteId: String,
            sensorId: String,
            parameter: String,
            value: String,
            datetime: Date
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

    
    const Message = mongoose.model("message", schema);
        
    return Message;
}