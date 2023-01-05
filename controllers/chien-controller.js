const Chien = require("./../models/Chien");

//**creer un chien */
const createChien = async (req, res, next) => {
	const { nom, couleur, race } = req.body;

	if (nom === "" || couleur === "" || race === "") {
		return res.status(422).json({ message: "données invalides" });
	}
	const chien = new Chien({ nom: nom, couleur: couleur, race: race });
	try {
		const resultat = await chien.save();

		return res.status(201).json({ message: "chien à été insérer avec succès", chien: resultat });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la création du chien" });
	}
};

//**recuperer la liste des chiens */
const getChiens = async (req, res, next) => {
	try {
		const chiens = await Chien.find();
		if (chiens.length !== 0) {
			return res.status(200).json({ chiens: chiens });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la récupération des données" });
	}

	res.status(404).json({ message: "Chats non trouvés" });
};

//**recuperer un chien */
const getChien = async (req, res, next) => {
	const {
		params: { id },
	} = req;
	try {
		const chien = await Chien.findById(id);
		if (chien) {
			return res.status(200).json(chien);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la récupération du chien" });
	}

	res.status(404).json({ message: "chien non trouvè avec l'id fournie" });
};

//**modifier un chien */
const putChien = async (req, res, next) => {
	const {
		params: { id },
	} = req;
	const {
		body: { nom, race },
	} = req;

	if (nom === "" || race === "") {
		return res.status(422).json({ message: "données invalides" });
	}
	try {
		// 2- récupération du chat depuis la bdd
		const chien = await Chien.findById(id);
		if (chien) {
			chien.nom = nom;
			chien.race = race;
			await chien.save();
			return res.status(200).json({ message: "chien a été mit à jour avec succès", chien: chien });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la mise à jour du chien" });
	}

	return res.status(404).json({ message: "chat non trouvé" });
};

//**supprimer un chien */
const deleteChien = async (req, res, next) => {
	const {
		params: { id },
	} = req;
	try {
		const chien = await Chien.findById(id);
		if (chien) {
			await chien.delete();
			return res.status(200).json({ message: "chien a été supprimé avec succès" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la mise à jour du chien" });
	}
	return res.status(404).json({ message: "chien non trouvé" });
};

exports.createChien = createChien;
exports.getChiens = getChiens;
exports.getChien = getChien;
exports.putChien = putChien;
exports.deleteChien = deleteChien;
