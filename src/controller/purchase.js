const Purchase = require('../models/purchase')

exports.createPurchase = (req, res) => {
    console.log(req.body)
    const { batch_no, purchase_type, description, quantity, total_price } = req.body
    console.log(batch_no, purchase_type, description, quantity, total_price);
    const purchase = new Purchase({
        batch_no,
        purchase_type,
        description,
        quantity,
        total_price
    })
    purchase.save((err, purchase) => {
        if (err) return res.status(400).json({ err })
        if (purchase) {
            res.status(201).json(purchase)
        }
    })


}

exports.getPurchaseAll = (req, res) => {
    Purchase.find({})
        .exec((err, data) => {
            console.log(data);
            console.log("err", err);

            if (err) {
                res.status(400).json({ msg: "not found" })
            }
            if (data) {
                res.status(200).json(data)
            }
        })

}

exports.getPurchase = (req, res) => {
    let purchase_type = req.params.purchase_type
    Purchase.find({ purchase_type: purchase_type })
        .exec((err, data) => {
            console.log(data);
            console.log("err", err);

            if (err) {
                res.status(400).json({ msg: "not found" })
            }
            if (data) {
                res.status(200).json(data)
            }
        })

}


