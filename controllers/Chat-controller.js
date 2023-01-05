const Chat = require("./../models/Chat");

const getCats = async (req, res, next) => {
	// 200 : succes
	// 404 : non trouvé
	// 500 erreur du serveur (DB , api)
	try {
		const chats = await Chat.find();
		if (chats.length !== 0) {
			return res.status(200).json({ chats: chats }); // {chats}
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la récupération des données" });
	}

	res.status(404).json({ message: "Chats non trouvés" });
};

const createCat = async (req, res, next) => {
	const { nom, couleur, age } = req.body;
	if (nom === "" || couleur === "" || !age) {
		return res.status(422).json({ message: "données invalides" });
	}
	const chat = new Chat({ nom: nom, couleur: couleur, age: age });
	try {
		const resultat = await chat.save();

		return res.status(201).json({ message: "chat a été inséré avec succès", chat: resultat });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la création du chat" });
	}
};

const getCatById = async (req, res, next) => {
	// ES6
	const {
		params: { id },
	} = req;
	try {
		const chat = await Chat.findById(id);
		if (chat) {
			return res.status(200).json(chat);
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la récupération du chat" });
	}

	res.status(404).json({ message: "chat non trouvè avec l'id fournie" });
};

const updateCat = async (req, res, next) => {
	// 1- récupération de l'id et les données envoyées par le client
	const {
		params: { id },
	} = req;
	const {
		body: { nom, age },
	} = req;

	if (nom === "" || !age) {
		return res.status(422).json({ message: "données invalides" });
	}
	try {
		// 2- récupération du chat depuis la bdd
		const chat = await Chat.findById(id);
		if (chat) {
			chat.nom = nom;
			chat.age = age;
			await chat.save();
			return res.status(200).json({ message: "chat a été mit à jour avec succès", chat: chat });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la mise à jour du chat" });
	}

	return res.status(404).json({ message: "chat non trouvé" });
};

const deleteCat = async (req, res, next) => {
	const {
		params: { id },
	} = req;
	try {
		const chat = await Chat.findById(id);
		if (chat) {
			await chat.delete();
			return res.status(200).json({ message: "chat a été supprimé avec succès" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Erreur lors de la mise à jour du chat" });
	}
	return res.status(404).json({ message: "chat non trouvé" });
};

// export multiple
exports.getCats = getCats;
exports.createCat = createCat;
exports.getCatById = getCatById;
exports.updateCat = updateCat;
exports.deleteCat = deleteCat;
