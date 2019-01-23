const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, db) {
    if (err) throw err;

    var dbo = db.db("famdb");
    var col = dbo.collection("persons");

    for (var i = 0; i < testFam.length; i++) {
        try {
            col.insertOne(testFam[i]);
        } catch (e) {
            console.log(e)
        }
    }
    db.close();
});

const testFam = [{
        _id: 1231,
        firstName: "Callaghan",
        lastName: "Smith",
        age: 60,
        gender: "Male",
        pline: [1231],
        children: [123],
        spouse: {
            firstName: "Stella",
            lastName: "Smith",
            _id: 1232
        }
    },
    {
        _id: 1232,
        firstName: "Stella",
        lastName: "Smith",
        age: 61,
        gender: "Female",
        mline: [1231],
        children: [123],
        spouse: {
            firstName: "Callaghan",
            middleName: "Vaughn",
            lastName: "Smith",
            _id: 123
        }
    },
    {
        _id: 12341,
        firstName: "Lawrence",
        lastName: "Creighton",
        age: 65,
        gender: "Male",
        pline: [12341],
        children: [1234],
        spouse: {
            firstName: "Louise",
            lastName: "Creighton",
            _id: 12342
        }
    },
    {
        _id: 12342,
        firstName: "Louise",
        lastName: "Creighton",
        age: 63,
        gender: "Female",
        mline: [12342],
        children: [1234],
        spouse: {
            firstName: "Lawrence",
            lastName: "Creighton",
            _id: 12341
        }
    },
    {
        _id: 123,
        firstName: "Andrew",
        lastName: "Smith",
        title: "Sr.",
        age: 40,
        gender: "Male",
        pline: [1231, 123],
        mline: [1232],
        parents: {
            p: 1231,
            m: 1232
        },
        children: [2231, 2232, 2233],
        spouse: {
            firstName: "Mary",
            lastName: "Smith",
            _id: 1234
        }
    },
    {
        _id: 1234,
        firstName: "Mary",
        middleName: "Jane",
        lastName: "Smith",
        age: 39,
        gender: "Female",
        parents: {
            p: 12341,
            m: 12342
        },
        pline: [12341],
        mline: [12342, 1234],
        children: [2231, 2232, 2233],
        spouse: {
            firstName: "Andrew",
            lastName: "Smith",
            _id: 123
        }
    },
    {
        _id: 2231,
        firstName: "Andrew",
        lastName: "Smith",
        age: 15,
        gender: "Male",
        parents: {
            p: 123,
            m: 1234
        },
        pline: [1231, 123, 2231],
        mline: [12342, 1234]
    },
    {
        _id: 2232,
        firstName: "Sally",
        lastName: "Smith",
        age: 17,
        gender: "Female",
        parents: {
            p: 123,
            m: 1234
        },
        pline: [1231, 123],
        mline: [12342, 1234, 2232]
    },
    {
        _id: 2233,
        firstName: "Randall",
        lastName: "Smith",
        age: 12,
        gender: "Male",
        parents: {
            p: 123,
            m: 1234
        },
        pline: [1231, 123, 2233],
        mline: [12342, 1234]
    },
]