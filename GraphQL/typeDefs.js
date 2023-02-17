const { gql } = require('@apollo/server');

module.exports = `#graphql
    type Lyric {
        id: ID,
        likes: Int,
        content: String,
        song: Song
    }

    type Song {
        id: ID,
        title: String
        lyrics: [Lyric]
    }

    input LyricInput {
        id: ID,
        content: String,
        song: Song
    }

    type LyricQuery {
        getLyricInfo(content: String!): Lyric!
        getLyric(id: ID!): Lyric!
    }

    type SongQuery {
        getSong(id: ID!): Song!
        getSongInfo(title: String!): Song!
    }

    type Mutation {
        createSong(title: String): Song!
        deleteSong(id: ID!): Boolean
        editSong(songInput: SongInput): Boolean
    }
`;