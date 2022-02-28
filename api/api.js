module.exports = {
    getElems (O) {
        return (req, res) => {
            let limite = (req.query["limit"] !== undefined) ? parseInt(req.query["limit"]) : 1000;
            let skip = (req.query["skip"] !== undefined) ? parseInt(req.query["skip"]) : 0;
            O.find({}, null, { skip: skip, limit: limite }, (err, elems) => {
                if (err) { res.send (err) }
                res.send (elems)
            })
                
        }
    },
    postElem (O) {
        return (req, res) => {
            let elem = new O ();
        }
    }, 
    getElem (O) {
        return (req, res) => {
            O.findOne ({id: req.params.id}, (err, elem) => {
                if (err) { res.send(err) }
                res.json (elem);
            })
        }
    }, 
    updateElem (O) {
        return (req, res) => {
            O.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, elem) => {
                err ? res.send (err) : res.json ({message: 'updated'})
            })
        }
    }, 
    deleteElem (O) {
        return (req, res) => {
            O.findByIdAndRemove(req.params.id, (err, elem) => {
                if (err) { res.send(err) }
                res.json({message: `element deleted`});
            })
        }
    },
    countElems (O) {
        return (req, res) => {
            O.countDocuments({}, (err, count) => {
                if (err) { res.send (err) }
                res.send ({count: count})
            })
        }
    }
};
