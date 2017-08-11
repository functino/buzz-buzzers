module.exports = function(readBytes) {
    const mappings = [
        {
            bytes: [2, 7],
            button: 0,
            controller: 1
        },
        {
            bytes: [2, 3],
            button: 1,
            controller: 1
        },
        {
            bytes: [2, 4],
            button: 2,
            controller: 1
        },
        {
            bytes: [2, 5],
            button: 3,
            controller: 1
        },
        {
            bytes: [2, 6],
            button: 4,
            controller: 1
        },
        // controller 2
        {
            bytes: [2, 2],
            button: 0,
            controller: 2
        },
        {
            bytes: [3, 6],
            button: 1,
            controller: 2
        },
        {
            bytes: [3, 7],
            button: 2,
            controller: 2
        },
        {
            bytes: [2, 0],
            button: 3,
            controller: 2
        },
        {
            bytes: [2, 1],
            button: 4,
            controller: 2
        },

        // controller 3
        {
            bytes: [3, 5],
            button: 0,
            controller: 3
        },
        {
            bytes: [3, 1],
            button: 1,
            controller: 3
        },
        {
            bytes: [3, 2],
            button: 2,
            controller: 3
        },
        {
            bytes: [3, 3],
            button: 3,
            controller: 3
        },
        {
            bytes: [3, 4],
            button: 4,
            controller: 3
        },

        // controller 4
        {
            bytes: [3, 0],
            button: 0,
            controller: 4
        },
        {
            bytes: [4, 4],
            button: 1,
            controller: 4
        },
        {
            bytes: [4, 5],
            button: 2,
            controller: 4
        },
        {
            bytes: [4, 6],
            button: 3,
            controller: 4
        },
        {
            bytes: [4, 7],
            button: 4,
            controller: 4
        }
    ];

    return function(data) {
        const bytes = readBytes(data);
        return mappings.map(mapping => {
            return Boolean(bytes[mapping.bytes[0]][mapping.bytes[1]]);
        });
    };
};
