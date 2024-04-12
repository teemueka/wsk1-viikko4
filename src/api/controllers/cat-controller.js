import {addCat, findCatById, listAllCats, modifyCat, removeCat, getCatsByUserId} from "../models/cat-model.js";

const getCat = async (req, res) => {
  res.json(await listAllCats());
};

const getCatsByOwner = async (req, res) => {
  const cats = await getCatsByUserId(req.params.id);
  if (cats) {
    res.json(cats)
  } else {
    res.sendStatus(404);
  }
}

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = async (req, res) => {
  const result = await addCat(req.body, req.file);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  const result = await modifyCat(req.body, req.params.id, res.locals.user);
  if (!result) {
    res.sendStatus(400);
    return;
  }
  res.json(result);
};

const deleteCat = (req, res) => {
  // not implemented in this example, this is future homework
  res.sendStatus(200);
};

export {getCat, getCatById, postCat, putCat, deleteCat, getCatsByOwner};
