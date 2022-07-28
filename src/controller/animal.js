

const Animal = require('../models/animal')
const slugify = require('slugify')

exports.createAnimal = (req, res) => {
    const { batch_no, id_no, purchase_type, purchase_date, fish_name, bio_flock_plant_no,
        weight, color, gender, age, quantity, buying_price, selling_price, category } = req.body
    let animal_picture = []
    console.log('req.files', req.files);
    if (req.files.length > 0) {
        animal_picture = req.files.map((file) => {
            return { img: file.filename }
        })
    }

    const animal = new Animal({

        batch_no: batch_no || null,
        id_no: id_no || null,

        // fish
        purchase_date: purchase_date || null,
        fish_name: fish_name || null,
        bio_flock_plant_no: bio_flock_plant_no || null,

        // common
        purchase_type: purchase_type,
        weight: weight || null,
        color: color || null,
        gender: gender,
        age: age || null,
        animal_picture: animal_picture || null,
        quantity: quantity || null,
        buying_price: buying_price || null,
        selling_price: selling_price,
        category,
        createBy: req.user._id
    })
    animal.save((err, animal) => {
        if (err) return res.status(400).json({ err })
        if (animal) {
            res.status(201).json({ animal })
        }
    })

}

// get all animal with pagination
exports.getAnimal = async (req, res) => {
    // console.log('req.query.page :', req.query.page);
    const PAGE_SIZE = 5;
    const page = parseInt(req.query.page || '0')
    const total = await Animal.countDocuments({})
    Animal.find({})
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page)
        .populate("category")
        .populate("createBy", "username email")
        .exec((error, animal) => {
            if (error) return res.status(400).json({ error })
            if (animal) {
                // console.log("animal", animal)
                let data = []
                animal.map(d => {
                    const a = {
                        batch_no: d.batch_no,
                        bio_flock_plant_no: d.bio_flock_plant_no,
                        id_no: d.id_no,
                        category_name: d?.category?.name,
                        category: d.category,
                        buying_price: d.buying_price,
                        fish_name: d.fish_name,
                        purchase_date: d.purchase_date,
                        purchase_type: d.purchase_type,
                        quantity: d.quantity,
                        selling_price: d.selling_price,
                        weight: d.weight,
                        color: d.color,
                        gender: d.gender,
                        age: d.age,
                        _id: d._id
                    }

                    data.push(a)
                })


                return res.status(200).json({
                    totalPages: Math.ceil(total / PAGE_SIZE),
                    data
                    // animal
                })
            }
        })
}


/* 
ekta animal must ekta category under e takbe 
one to one relationship
*/
exports.categoryByGetAnimal = (req, res) => {
    Animal.find({ category: req.params.id })
        .populate("category")
        .populate("createBy", "username email -_id")
        .exec((error, animal) => {
            if (error) return res.status(400).json({ error })
            if (animal) {
                return res.status(200).json({ animal })
            }
        })
}



/* 
ekta animal er must ekta user takbe
one to one relationship
*/
exports.userByGetAnimal = (req, res) => {
    Animal.find({ createBy: req.params.id })
        .populate("category")
        .populate("createBy", "username email ")
        .exec((error, animal) => {
            if (error) return res.status(400).json({ error })
            if (animal) {
                return res.status(200).json({ animal })
            }
        })
}

exports.deleteAnimal = (req, res) => {
    Animal.deleteOne({ _id: req.params.id }, (err, data) => {
        if (!err) {
            return res.status(200).json({ message: ' Delete successfully' })
        }
        else {
            console.log("error")
        }
    })
}