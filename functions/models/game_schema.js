const { Schema, model } = require('mongoose');

const gameSchema = Schema(
    {
        appid: {
            type: Number,
            required: [false, 'App id required'],
            unique: true,
        },
        name: {
            type: String,
            required: [false, 'App name is required'],
            unique: true,
        },
        release_year: {
            type: Number,
            required: [false, 'Release date is required'],
        },
        developer: {
            type: String,
            required: [false, 'Developer name(s) is required'],
        },
        publisher: {
            type: String,
            required: [false, 'Publisher name(s) is required'],
        },
        platforms: {
            type: String,
            required: [false, 'Game platform(s) is required'],
        },
        required_age: {
            type: Number,
            required: [false, 'Minimum age is required'],
        },
        genres: {
            type: String,
            required: [false, 'Genre(s) is required'],
        },
        categories: {
            type: String,
            required: [false, 'Category(s) is required'],
        },
        positive_ratings: {
            type: Number,
            required: false,
        },
        negative_ratings: {
            type: Number,
            required: false,
        },
        price: {
            type: Number,
            required: false,
        }
    }
);

module.exports = model('Game', gameSchema);
//----------------------------------------------------------------------------------
// 
// const { Schema, model } = require('mongoose');

// const gameSchema = Schema(
//     {
//         appid: {
//             type: Number,
//             required: [true, 'App id required'],
//             unique: true,
//         },
//         name: {
//             type: String,
//             required: [true, 'App name is required'],
//             unique: true,
//         },
//         release_year: {
//             type: Number,
//             required: [true, 'Release date is required'],
//         },
//         developer: {
//             type: Array,
//             required: [false, 'Developer name(s) is required'],
//         },
//         publisher: {
//             type: Array,
//             required: [false, 'Publisher name(s) is required'],
//         },
//         platforms: {
//             type: Array,
//             required: [false, 'Game platform(s) is required'],
//         },
//         required_age: {
//             type: Number,
//             required: [true, 'Minimum age is required'],
//         },
//         genres: {
//             type: Array,
//             required: [false, 'Genre(s) is required'],
//         },
//         categories: {
//             type: Array,
//             required: [false, 'Category(s) is required'],
//         },
//         positive_ratings: {
//             type: Number,
//             required: false,
//         },
//         negative_ratings: {
//             type: Number,
//             required: false,
//         },
//         price: {
//             type: Number,
//             required: true,
//         }
//     }
// );

// module.exports = model('Game', gameSchema);