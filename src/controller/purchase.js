const Purchase = require('../models/purchase')

exports.createPurchase = (req, res) => {
    console.log(req.body)
    const { batch_no, purchase_type, description, quantity, total_price } = req.body
    // console.log(batch_no, purchase_type, description, quantity, total_price);
    const purchase = new Purchase({
        batch_no,
        purchase_type,
        description,
        quantity,
        total_price,
        createBy: req.user._id
    })
    purchase.save((err, purchase) => {
        if (err) return res.status(400).json({ err })
        if (purchase) {
            res.status(201).json(purchase)
        }
    })


}

exports.getPurchaseAll = async (req, res) => {
    const PAGE_SIZE = 5;
    const page = parseInt(req.query.page || '0')
    const total = await Purchase.countDocuments({})
    console.log("total", total);
    Purchase.find({})
        .populate("createBy", "email role")
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page)
        .exec((err, purchaseData) => {

            if (err) {
                res.status(400).json({ msg: "not found" })
            }
            if (purchaseData) {
                return res.status(200).json({
                    totalPages: Math.ceil(total / PAGE_SIZE),
                    purchaseData
                })
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


exports.deletePurchase = (req, res) => {
    Purchase.deleteOne({ _id: req.params.id }, (err, data) => {
        if (!err) {
            return res.status(200).json({ message: ' Delete successfully' })
        }
        else {
            console.log("error")
        }
    })
}