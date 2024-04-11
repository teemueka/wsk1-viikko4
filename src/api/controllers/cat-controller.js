import {addCat, findCatById, listAllCats, modifyCat, removeCat, getCatsByUserId} from "../models/cat-model.js";

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatsByOwner = (req, res) => {
  const cats = getCatsByUserId(req.params.id);
  if (cats) {
    res.json(cats)
  } else {
    res.sendStatus(404);
  }
}

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileData = req.file;
  console.log('Uploaded file:', fileData);

  const newCat = {
    name: req.body.name,
    age: req.body.age,
    image: fileData.filename
  };

  const result = addCat(newCat);

  if (result.cat_id) {
    return res.status(201).json({ message: 'New cat added.', result });
  } else {
    return res.status(400).json({ error: 'Failed to add cat' });
  }
};

const putCat = (req, res) => {
  // not implemented in this example, this is future homework
  res.sendStatus(200);
};

const deleteCat = (req, res) => {
  // not implemented in this example, this is future homework
  res.sendStatus(200);
};

export {getCat, getCatById, postCat, putCat, deleteCat, getCatsByOwner};
