const Category = require("../models/category")
const slugify = require('slugify')



exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),
    }
    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId
    }
    const cat = new Category(categoryObj)
    cat.save((error, category) => {
        if (error) return res.status(400).json({ error })
        if (category) {
            return res.status(201).json({ category })
        }
    })
}

function createCategories(categories, parentId = null) {
    // console.log("///////////", categories);
    let categoryList = []
    let category;
    // console.log(parentId);
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined)
        // console.log(".................", category);
    } else {
        // categories.filter(cat => console.log(cat.parentId, parentId))
        category = categories.filter(cat => cat.parentId == parentId)
        // console.log("________________", category);
    }
    for (let cate of category) {
        // console.log("cate", cate);
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: createCategories(categories, cate._id)
        })

        // console.log("categoryList", categoryList);

    }
    return categoryList;

}

exports.getCategories = (req, res) => {
    Category.find({})
        .exec((error, categories) => {
            if (error) return res.status(400).json({ error })
            if (categories && categories.length > 0) {
                const categoryList = createCategories(categories)
                return res.status(200).json({ categoryList })
            }
        })
}



exports.deleteCategories = (req, res) => {
    Category.deleteOne({ _id: req.params.id }, (err, data) => {
        if (!err) {
            return res.status(200).json({ message: ' Delete successfully' })
        }
        else {
            console.log("error")
        }
    })
}


exports.test = (req, res) => {
    res.status(200).json({
        user: 'category'
    })
}