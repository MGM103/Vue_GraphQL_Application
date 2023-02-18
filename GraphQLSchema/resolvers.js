const Song = require('../models/song');

module.exports = {
    Query: {
        async getSong(parentVal, { id }) {
            return await Song.findById(id);
        },
        async getSongInfo(_, { title }) {
            return await Song.find().sort({createdAt: -1}).limit(5);
        }
    },
    Mutation: {
        async createSong(_, { title }) {
            const newSong = new Song({
                title,
                createdAt: new Date().toISOString()
            });
        
            const res = await newSong.save();

            return {
                id: res.id,
                ...res._doc
            }
        },
        async deleteSong(_, { id }) {
            const wasDeleted = (await Song.deleteOne({_id: id})).deletedCount;
            return wasDeleted;
        }
    }
}