const { MongoClient, ObjectId } = require('mongodb');

// konfigurasi
const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'wpu';

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect((error, client) => {
    if (error) {
        return console.log('Koneksi Gagal!');
    }

    // console.log('Koneksi Berhasil!')

    // pilih database
    const db = client.db(dbName);

    // // Menambahkan 1 data ke collection mahasiswa
    // db.collection('mahasiswa').insertOne(
    //     {
    //         nama: 'Erik',
    //         email: 'erik@gmail.com'
    //     },
    //     (error, result) => {
    //         if (error) {
    //             return console.log('Gagal Menambahkan Data!');
    //         }
            
    //         console.log(result);
    //     }
    // );

    // // menambahkan lebih dari 1 data
    // db.collection('mahasiswa').insertMany(
    //     [
    //         {
    //             nama: 'Erik',
    //             email: 'erik@yahoo.com'
    //         },
    //         {
    //             nama: 'Sule',
    //             email: 'sule@gmail.com'
    //         }
    //     ],
    //     (error, result) => {
    //         if (error) {
    //             return console.log('Data Gagal Ditambahakan!')
    //         }
            
    //         console.log(result);
    //     }
    // );

    // // menampilkan semua data yang ada pada collection 'mahasiswa'
    // console.log(db.collection('mahasiswa').find().toArray((error, result) => {
    //     console.log(result)
    // }));

    // // menampilkan semua data berdasarkan kriteria yang ada pada collection 'mahasiswa'
    // console.log(db.collection('mahasiswa').find({ _id: ObjectId('672d7b4d381ba415b882b06a') }).toArray((error, result) => {
    //     console.log(result)
    // }));

    // // mengubah data berdasarkan id
    // const updatePromise = db.collection('mahasiswa').updateOne(
    //     {
    //         _id: ObjectId('672d7a266ea39840b07f1e36')
    //     },
    //     {
    //         $set: {
    //             nama: 'Eriko Asep',
    //             email: 'erikolim@gmail.com'
    //         },
    //     }
    // );

    // updatePromise.then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // // mengubah data lebih dari 1 berdasarkan id
    // db.collection('mahasiswa').updateMany(
    //     {
    //         nama: 'Erik'
    //     },
    //     {
    //         $set: {
    //             nama: 'Eriko Doang',
    //         },
    //     }
    // );

    // // menghapus 1 data
    // db.collection('mahasiswa').deleteOne(
    //     {
    //         _id: ObjectId('672d6bbcaf9d6d43770d8191')
    //     }
    // ).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    // menghapus lebih dari 1 data
    db.collection('mahasiswa').deleteMany(
        {
            nama: 'Eriko Doang'
        }
    ).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });


})