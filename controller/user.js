import db from '../model/DataBase.js'


export const insertUserDetails = async (req, res) => {
    const { name, email, contact } = req.body;

    // Perform server-side validation
    if (!name || !email || !contact) {
        return res.status(400).send({ error: "Please provide all required fields." });
    }

    const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";
    try {
        const result = await db.promise().execute(sqlInsert, [name, email, contact]);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: "An error occurred while inserting the user's data." });
    }
};



export const updateUserDetails = (req, res) => {
    const { name, email, contact } = req.body;
    const id = req.params.id;

    if (!name || !email || !contact || !id) {
        return res.status(400).send({ error: "Please provide all required fields" });
    }

    const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, contact, id], (error) => {
        if (error) {
            console.error("An error occurred while updating the user's data:", error);
            res.status(500).send({ error: "An error occurred while updating the user's data" });
        } else {
            res.status(200).send("User details updated successfully");
        }
    });
};



export const deleteUserDetails = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send({ error: "Please provide the ID parameter" });
    }

    const sqlCheck = "SELECT * FROM contact_db WHERE id = ?";
    db.query(sqlCheck, [id], (error, result) => {
        if (error) {
            console.error("An error occurred while checking the user's data:", error);
            res.status(500).send({ error: "An error occurred while checking the user's data" });
        } else {
            if (result.length === 0) {
                return res.status(404).send({ error: "User not found" });
            }

            const sqlDelete = "DELETE FROM contact_db WHERE id = ?";
            db.query(sqlDelete, [id], (error) => {
                if (error) {
                    console.error("An error occurred while deleting the user's data:", error);
                    res.status(500).send({ error: "An error occurred while deleting the user's data" });
                } else {
                    res.status(200).send("User details deleted successfully");
                }
            });
        }
    });
};


export const getAllUserDetails = (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        if (error)
            res.status(500).json({ error: "An error occurred while retrieving user details." });
        else
            res.json(result);
    });
}